import deferComponents from "./deferComponents.js";

import { MessageFlags } from "discord.js";


export default class BaseCommand {


   constructor(interaction) {
      this.interaction = interaction;
   };


   /**
    * @type {import("discord.js").ChatInputCommandInteraction | import("discord.js").MessageComponentInteraction | import("discord.js").ModalSubmitInteraction | import("discord.js").MessageContextMenuCommandInteraction | import("discord.js").UserContextMenuCommandInteraction}
    */
   interaction;


   async getCommandId(commandName = this.interaction.commandName) {
      if (this.interaction.isChatInputCommand() && this.interaction.commandName === commandName) // if the commandName is the same as this command's name ("fox") then the command id is found within the this.interaction object
         return this.interaction.commandId;

      else {
         let commandId;

         // fetch all application commands and return the id of the command
         const applicationCommands = await this.interaction.client.application.commands.fetch();
         commandId = applicationCommands.find(command => command.name === commandName)?.id ?? 0;

         // if there's command id, fetch all application commands and return the id of the command
         if (!commandId) {
            const guildCommands = await this.interaction.guild.commands.fetch();
            commandId = guildCommands.find(command => command.name === commandName)?.id ?? 0;
         };

         // return the command id
         return commandId;
      };
   };


   repliedTo = false;


   isSameCommandUser() {
      const isCommandReply = this.interaction.message?.interactionMetadata;
      const isSameCommandUser = this.interaction.message?.interactionMetadata?.user.id === this.interaction.user.id;
      const isEphemeral = this.interaction.message?.flags.has(MessageFlags.Ephemeral);

      return (isCommandReply && isSameCommandUser) || isEphemeral;
   };


   /**
    * @type {boolean}
    */
   get hidden() {
      return this.interaction.options?.getBoolean(`hidden`) ?? false;
   };


   async deferInteraction() {
      // this interaction has been deferred (replied to)
      this.repliedTo = true;


      switch (true) {
         // defer the interaction
         case this.interaction.isChatInputCommand():
         case this.interaction.isModalSubmit():
         case this.interaction.isContextMenuCommand():
            return void await this.interaction.deferReply({
               flags: [
                  ...this.hidden
                     ? [ MessageFlags.Ephemeral ]
                     : []
               ]
            });

         // update the interaction's original reply, or create a new reply
         case this.interaction.isButton():
         case this.interaction.isAnySelectMenu():
            if (this.isSameCommandUser())
               return void await this.interaction.update({
                  components: deferComponents(this.interaction.customId, this.interaction.client.allEmojis, this.interaction.message.components, this.interaction.values),
                  allowedMentions: {
                     parse: []
                  }
               });
            else
               return void await this.interaction.deferReply({
                  flags: [
                     MessageFlags.Ephemeral
                  ]
               });
      };
   };


   /**
    * @param {string | import("discord.js").MessagePayload | import("discord.js").InteractionReplyOptions} payload
    */
   async respondToInteraction(payload) {
      switch (true) {
         // edit the deferred interaction
         case this.interaction.isChatInputCommand():
         case this.interaction.isModalSubmit() && !this.interaction.isFromMessage():
         case this.interaction.isContextMenuCommand():
            if (!this.repliedTo)
               await this.interaction.reply({
                  ...payload,
                  flags: [
                     ...payload.flags || [],
                     ...this.hidden && !payload.flags?.includes(MessageFlags.Ephemeral)
                        ? [ MessageFlags.Ephemeral ]
                        : []
                  ]
               });
            else
               await this.interaction.editReply(payload);
            break;

         // update the interaction's original reply or create a new reply
         case this.interaction.isButton():
         case this.interaction.isAnySelectMenu():
         case this.interaction.isModalSubmit() && this.interaction.isFromMessage():
            if (!this.repliedTo)
               if (this.isSameCommandUser())
                  await this.interaction.update(payload);
               else
                  await this.interaction.reply({
                     ...payload,
                     flags: [
                        ...payload.flags || [],
                        MessageFlags.Ephemeral
                     ]
                  });
            else
               await this.interaction.editReply(payload);
      };

      // this interaction has been replied to
      this.repliedTo = true;
   };


};