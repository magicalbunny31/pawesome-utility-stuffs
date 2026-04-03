import choice from "../choice.js";
import colours from "../colours.js";
import noop from "../noop.js";
import emojis from "./emojis.js";

import { AttachmentBuilder, ContainerBuilder, escapeItalic, FileBuilder, heading, HeadingLevel, hyperlink, inlineCode, italic, MessageFlags, quote, SeparatorBuilder, SeparatorSpacingSize, spoiler, subtext, TextDisplayBuilder, unorderedList } from "discord.js";


/**
 * @param {import("discord.js").Interaction} interaction
 * @returns {string}
 */
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


/**
 * @param {ReturnType<import("./emojis.js").default>} emojis
 * @returns {string}
 */
const getResponse = emojis => {
   const texts = [
      `${emojis[`WHAT`]} ahhhhh! what just happened?!`,
      `${emojis.shy} that wasn't supposed to happen..`,
      `${emojis.sweats} well, this is awkward..`,
      `${emojis.hug} don't worry! this thing'll be fixed soon~`,
      `${emojis.boooo} boooo!`,
      `${emojis.stop} stop right there, criminal scum!`,
      `${emojis.vibe} what the hell am i doin' here? i don't belong here..~`,
      `${emojis.mwaah} how about going out for some air while you wait for this to be fixed?`,
      `${emojis.aie} take that! -and this!`,
      `${emojis.pop} ..ahh, that's apples mate.`,
      `${emojis.shhh} shhh! this is top secret stuffs!!`,
      `${emojis.ow} this is like watching a train wreck in slow motion, man`,
      `${emojis[`HOLY`]} ${escapeItalic(`*BAM*`)}`,
      `${emojis.dazed} not good!`,
      `${emojis[`WHAT`]} ${escapeItalic(`*confused screaming noises*`)}`,
      // `${emojis.slurp} ${escapeItalic(`*slurp*`)}`, // TODO need new emoji (i like this one)
      // `${emojis.nom} nom, nom, eat this.. nom, nom.`, // TODO need new emoji (i like this one)
      `${emojis.woah} got damn!`,
      `${emojis.pawbs} look at all these beans`,
      `${emojis.ooh} i think this code here is, well, drunken`,
      `${emojis[`GROWL`]} BLOODY HELL!`,
      `${emojis.stare} oh noes! another error!`,
      `${emojis.eugh} so this is what happens when you entrust a furry with development, huh`,
      `${emojis.airplane} destination: unknown`,
      `${emojis.loading} ${spoiler(`y`)}${spoiler(`o`)}${spoiler(`u`)} ${spoiler(`h`)}${spoiler(`a`)}${spoiler(`v`)}${spoiler(`e`)} ${spoiler(`b`)}${spoiler(`e`)}${spoiler(`e`)}${spoiler(`n`)} ${spoiler(`e`)}${spoiler(`n`)}${spoiler(`t`)}${spoiler(`e`)}${spoiler(`r`)}${spoiler(`t`)}${spoiler(`a`)}${spoiler(`i`)}${spoiler(`n`)}${spoiler(`e`)}${spoiler(`d`)}${spoiler(`!`)}`,
      `${emojis[`EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE`]} ooh boy, another bug to squash!`,
      `${emojis.happ}${emojis.happ}${emojis.happ}`,
      `${emojis[`FOX`]} here's a fox for moral support~`,
      `${emojis.hehe} no amount of washi tape can fix this!`,
      `${emojis.mwaah} sorry we've left you astray!`,
      `${emojis.bruh} either the dumb furry dev got something wrong or you broke this (accidentally?)`,
      `${emojis.bonk} we, too, really have no idea as to what has happened..`,
      `${emojis.oi} EY! ERROR!`,
      `${emojis.yeet} ..i can't think of a witty comment including the word "yeet" ${escapeItalic(`*~ dev furry*`)}`,
      `${emojis.yaya} welcome! you've just discovered our secret party!`,
      `${emojis.bap} this ain't it, stop!`,
      `${emojis.pleaseee} there's gotta be some room for cute furry boys....right?`,
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
      `${emojis.shy} xwx`,
      `${emojis.ping} welp, that's another notification to the error log..`,
      `${emojis.stare} WHAT HAVE YOU DONE.`,
      `${emojis.GROWL} FUR LION'S SAKE`,
      `${emojis.bonk} BAD CODE, BAD CODE`,
      `${emojis.vibe} who's got time for this? i'm jammin' to music~`,
      `${emojis.noted} i'll make a note of this!`,
      `${emojis.noted} logged this one, chef!`,
      `${emojis.noted} did you see that?`,
      `${emojis.dazed} oogh..`,
      `${emojis.dazed} oh dear..`,
      `${emojis.thinking} huh?`
   ]
      .filter(text => !text.startsWith(`undefined`));

   return choice(texts);
};


/**
 * @param {import("discord.js").Interaction} interaction
 * @param {string} [guildInvite=`https://nuzzles.dev/discord`]
 * @param {Error} [error]
 * @returns {Promise<void>}
 */
export default async (interaction, guildInvite = `https://nuzzles.dev/discord`, error) => {
   // guild and application emojis
   const allEmojis = emojis(await interaction.client.application.emojis.fetch());


   // other variables
   const type = getInteractionType(interaction);
   const response = getResponse(allEmojis);


   // components
   const components = [
      new ContainerBuilder()
         .setAccentColor(colours.red)
         .addTextDisplayComponents(
            new TextDisplayBuilder()
               .setContent(
                  [
                     heading(`${allEmojis.rip} an error occurred with this ${type}..`, HeadingLevel.Three),
                     quote(response)
                  ]
                     .join(`\n`)
               )
         )
         .addSeparatorComponents(
            new SeparatorBuilder()
               .setDivider(true)
               .setSpacing(SeparatorSpacingSize.Small)
         )
         .addTextDisplayComponents(
            new TextDisplayBuilder()
               .setContent(
                  subtext(`${allEmojis.info} ${inlineCode(interaction.id)}`)
               )
         )
   ];


   try {
      // attempt to defer the reply ephemerally, if not then assume the interaction has been replied to already
      await interaction.deferReply({
         flags: [
            MessageFlags.Ephemeral
         ]
      });

   } catch {
      noop;

   } finally {
      // this *could* have a chance of throwing an error (user deleting message, guild deleted..)
      try {
         await interaction.editReply({
            content: null,
            components,
            files: [],
            flags: [
               MessageFlags.IsComponentsV2
            ]
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
            components: [
               new TextDisplayBuilder()
                  .setContent(
                     [
                        heading(`${allEmojis.context_menu_command} attached is the error log`, HeadingLevel.Three),
                        unorderedList([
                           `don't worry: the developers have received a copy of this too~`,
                           `wanna learn more about this error? feel free to send this in the ${hyperlink(`support server`, guildInvite)}!`,
                           [
                              guildInvite
                           ]
                        ])
                     ]
                        .join(`\n`)
                  ),
               new FileBuilder()
                  .setURL(`attachment://error.log`)
            ],
            files: [
               new AttachmentBuilder()
                  .setFile(
                     Buffer.from(error.stack)
                  )
                  .setName(`error.log`)
            ],
            flags: [
               MessageFlags.SuppressEmbeds,
               MessageFlags.Ephemeral,
               MessageFlags.SuppressNotifications,
               MessageFlags.IsComponentsV2
            ]
         });

      } catch {
         // this *could* have a chance of throwing an error (channel/guild deleted..)
         noop;
      };
   };
};