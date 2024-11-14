
const { EmbedBuilder, heading, HeadingLevel, italic, quote } = require("discord.js");


const getInteractionType = interaction => {
   switch (true) {
      case interaction.isAnySelectMenu?.(): return `select menu`;
      case interaction.isButton?.():        return `button`;
      default:                              return `message component`;
   };
};


const getResponse = (emojis, expectedUser, receivedUser) => {
   const { choice } = require("../../");

   const texts = [
      `${emojis.hmmph} literally 1984`,
      `${emojis.aie} NO TOUCHIES!!`,
      `${emojis.oi} how'd ya like it if i interacted with YOUR components??`,
      `${emojis.boooo} grrr`,
      `${emojis.blushy} uhm....you're not ${expectedUser}..`,
      `${emojis.scree} wah!`,
      `${emojis.ow} think you're tough now, tough guy?`,
      `${emojis.claps} wow that's so funny yeah`,
      `${emojis.hwat} skill issue`,
      `${emojis.rip} ${italic(`CRY SOME MORE!`)}`,
      `${emojis.why} you couldn't resist....huh?`,
      `${emojis.bap} keep those boopers to yourself!`,
      `${emojis.yeet} what the heck man`,
      `${emojis.shrug} well i didn't expect ${italic(`that`)}!`,
      `${emojis.furthinking} ${expectedUser} ≠ ${receivedUser}`,
      `${emojis.why} no, no, no!`,
      `${emojis.aie} huh?`,
      `${emojis.oi} this is Not a good habit to get into`,
      `${emojis.stop} IT WAS A MISINPUT`,
      `${emojis.rip} nah dog`,
      `${emojis.noooo} that wasn't supposed to happen!`,
      `${emojis.boooo} whar`,
      `${emojis.aie} no`,
      `${emojis.bap} it's so over`,
      `${emojis.shy} awh!`
   ]
      .filter(text => !text.startsWith(`undefined`));

   return choice(texts);
};


module.exports = async (interaction, expectedUser, receivedUser) => {
   // imports
   const { colours, emojis } = require("../../");


   // this is the same user
   if (expectedUser.id === receivedUser.id)
      return;


   // guild and application emojis
   const allEmojis = emojis(await interaction.client.application.emojis.fetch());


   // some other variables
   const type = getInteractionType(interaction);
   const response = getResponse(allEmojis);


   // embeds
   const embeds = [
      new EmbedBuilder()
         .setColor(colours.red)
         .setDescription(
            [
               heading(`${allEmojis.no} only ${expectedUser} can interact with this ${type} - not you!`, HeadingLevel.Three),
               quote(response)
            ]
               .join(`\n`)
         )
         .setFooter({
            text: `🆔 ${interaction.id}`
         })
   ];


   // respond to the interaction
   await interaction.reply({
      embeds,
      ephemeral: true
   });
};