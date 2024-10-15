const { AttachmentBuilder, EmbedBuilder, escapeItalic, heading, HeadingLevel, hyperlink, italic, MessageFlags, quote, spoiler, unorderedList } = require("discord.js");


const getInteractionType = interaction => {
   switch (true) {
      case interaction.isAnySelectMenu?.():      return `select menu`;
      case interaction.isButton?.():             return `button`;
      case interaction.isChatInputCommand?.():   return `slash command`;
      case interaction.isContextMenuCommand?.(): return `context menu command`;
      case interaction.isModalSubmit?.():        return `modal`;
      default:                                   return `interaction`;
   };
};


const getResponse = emojis => {
   const { choice } = require("../../");

   const texts = [
      `${emojis.blushy} ahhhhh! what just happened?!`,
      `${emojis.spiky_speech_bubble} that wasn't supposed to happen..`,
      `${emojis.sweats} well, this is awkward..`,
      `${emojis.hug} don't worry! this thing'll be fixed soon~`,
      `${emojis.boooo} boooo!`,
      `${emojis.stop} stop right there, criminal scum!`,
      `${emojis.music_notes} what the hell am i doin' here? i don't belong here..~`,
      `${emojis.national_park} how about going out for some air while you wait for this to be fixed?`,
      `${emojis.aie} take that! -and this!`,
      `${emojis.pbjt} ..ahh, that's apples mate.`,
      `${emojis.shhh} shhh! this is top secret stuffs!!`,
      `${emojis.ow} this is like watching a train wreck in slow motion, man`,
      `${emojis.dab} ${escapeItalic(`*BAM*`)}`,
      `${emojis.yoshifall} not good!`,
      `${emojis.scree} ${escapeItalic(`*confused sergal screaming noises*`)}`,
      `${emojis.slurp} ${escapeItalic(`*slurp*`)}`,
      `${emojis.nom} nom, nom, eat this.. nom, nom.`,
      `${emojis.woah} got damn!`,
      `${emojis.pawbs} look at all these beans`,
      `${emojis.ooh} i think this code here is, well, drunken`,
      `${emojis[`BWAH`]} BLOODY HELL!`,
      `${emojis.onoes} oh noes! another error!`,
      `${emojis.wrench} so this is what happens when you entrust a furry with development, huh`,
      `${emojis.airplane} destination: unknown`,
      `${emojis.loading} ${spoiler(`y`)}${spoiler(`o`)}${spoiler(`u`)} ${spoiler(`h`)}${spoiler(`a`)}${spoiler(`v`)}${spoiler(`e`)} ${spoiler(`b`)}${spoiler(`e`)}${spoiler(`e`)}${spoiler(`n`)} ${spoiler(`e`)}${spoiler(`n`)}${spoiler(`t`)}${spoiler(`e`)}${spoiler(`r`)}${spoiler(`t`)}${spoiler(`a`)}${spoiler(`i`)}${spoiler(`n`)}${spoiler(`e`)}${spoiler(`d`)}${spoiler(`!`)}`,
      `${emojis[`EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE`]} ooh boy, another bug to squash!`,
      `${emojis.happ}${emojis.happ}${emojis.happ}`,
      `${emojis[`FOX`]} here's a fox for moral support~`,
      `${emojis.hwat} no amount of washi tape can fix this!`,
      `${emojis.facepaw} sorry we've left you astray!`,
      `${emojis.muh} either the dumb furry dev got something wrong or you broke this (accidentally?)`,
      `${emojis.pfff} we, too, really have no idea as to what has happened..`,
      `${emojis.oi} EY! ERROR!`,
      `${emojis.yeet} ..i can't think of a witty comment including the word "yeet" ${escapeItalic(`*~ dev furry*`)}`,
      `${emojis.yaya} welcome! you've just discovered our secret party!`,
      `${emojis.bap} this ain't it, stop!`,
      `${emojis.cutie} there's gotta be some room for cute furry boys....right?`,
      `${emojis.bah} well, you don't see ${escapeItalic(`*that*`)} every day!`,
      `${emojis.claps} aye aye, well done chef`,
      `${emojis.furdancing} out partying~`,
      `${emojis.mhn} i can fix it!`,
      `${emojis.hmmph} awh, well damn!`,
      `${emojis.shrug} muh`,
      `${emojis.why} why did this happen?!`,
      `${emojis.concern} ${escapeItalic(`*mentally distraught*`)}`,
      `${emojis.haha_uhh} well, this is awkward..`,
      `${emojis.stretch} ${italic(`i'll do something later..`)}`,
      `${emojis.beg} d-don't tell anyone you saw this, o-okai?..`,
      `${emojis.boop} ${escapeItalic(`*boop*`)}`,
      `${emojis.hmmph} guh`,
      `${emojis.eepy} code is eepy just like i am zzz`,
      `${emojis.shy} xwx`
   ]
      .filter(text => !text.startsWith(`undefined`));

   return choice(texts);
};


module.exports = async (interaction, guildInvite, error) => {
   // imports
   const { colours, emojis, noop } = require("../../");


   // guild and application emojis
   const allEmojis = emojis(interaction.client.application.id);


   // other variables
   const type = getInteractionType(interaction);
   const response = getResponse(allEmojis);


   // embeds
   const embeds = [
      new EmbedBuilder()
         .setColor(colours.red)
         .setDescription(
            [
               heading(`${allEmojis.rip} an error occurred with this ${type}..`, HeadingLevel.Three),
               quote(response)
            ]
               .join(`\n`)
         )
         .setFooter({
            text: `🆔 ${interaction.id}`
         })
   ];


   try {
      // attempt to defer the reply ephemerally, if not then assume the interaction has been replied to already
      await interaction.deferReply({
         ephemeral: true
      });

   } catch {
      noop;

   } finally {
      // this *could* have a chance of throwing an error (user deleting message, guild deleted..)
      try {
         await interaction.editReply({
            content: null,
            embeds,
            components: [],
            files: []
         });

      } catch {
         noop;
      };
   };


   // follow-up with the error log
   if (error) {
      try {
         // attempt to follow-up ephemerally
         await interaction.followUp({
            content: [
               heading(`${allEmojis.context_menu_command} attached is the error log`, HeadingLevel.Three),
               unorderedList([
                  `don't worry: the developers have received a copy of this too~`,
                  `wanna learn more about this error? feel free to send this in the ${hyperlink(`support server`, guildInvite)}!`,
                  [
                     guildInvite
                  ]
               ])
            ]
               .join(`\n`),
            files: [
               new AttachmentBuilder()
                  .setFile(
                     Buffer.from(error.stack)
                  )
                  .setName(`error.log`)
            ],
            flags: [
               MessageFlags.SuppressEmbeds,
               MessageFlags.SuppressNotifications
            ],
            ephemeral: true
         });

      } catch {
         // this *could* have a chance of throwing an error (channel/guild deleted..)
         noop;
      };
   };
};