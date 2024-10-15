module.exports = permissionsInput => {
   // imports
   const { sum } = require("../../");
   const { PermissionFlagsBits } = require("discord.js");


   // get the permissionsInput as a BigInt
   const permissions = Array.isArray(permissionsInput)
      ? sum(permissionsInput, 0n)
      : BigInt(permissionsInput);


   // list of permissions
   const permissionsList = {
      // general server permissions
      [PermissionFlagsBits.ViewChannel]:            `View Channels `,
      [PermissionFlagsBits.ManageChannels]:         `Manage Channels`,
      [PermissionFlagsBits.ManageRoles]:            `Manage Roles`,
      [PermissionFlagsBits.CreateGuildExpressions]: `Create Expressions`,
      [PermissionFlagsBits.ManageGuildExpressions]: `Manage Expressions`,
      [PermissionFlagsBits.ViewAuditLog]:           `View Audit Log`,
      [PermissionFlagsBits.ViewGuildInsights]:      `View Server Insights`,
      [PermissionFlagsBits.ManageWebhooks]:         `Manage Webhooks`,
      [PermissionFlagsBits.ManageGuild]:            `Manage Server`,

      // membership permissions
      [PermissionFlagsBits.CreateInstantInvite]: `Create Invite`,
      [PermissionFlagsBits.ChangeNickname]:      `Change Nickname`,
      [PermissionFlagsBits.ManageNicknames]:     `Manage Nicknames`,
      [PermissionFlagsBits.KickMembers]:         `Kick Members`,
      [PermissionFlagsBits.BanMembers]:          `Ban Members`,
      [PermissionFlagsBits.ModerateMembers]:     `Timeout Members`,

      // text channel permissions
      [PermissionFlagsBits.SendMessages]:          `Send Messages`,
      [PermissionFlagsBits.SendMessagesInThreads]: `Send Messages in Threads`,
      [PermissionFlagsBits.CreatePublicThreads]:   `Create Public Threads`,
      [PermissionFlagsBits.CreatePrivateThreads]:  `Create Private Threads`,
      [PermissionFlagsBits.EmbedLinks]:            `Embed Links`,
      [PermissionFlagsBits.AttachFiles]:           `Attach Files`,
      [PermissionFlagsBits.AddReactions]:          `Add Reactions`,
      [PermissionFlagsBits.UseExternalEmojis]:     `Use External Emojis`,
      [PermissionFlagsBits.UseExternalStickers]:   `Use External Stickers`,
      [PermissionFlagsBits.MentionEveryone]:       `Mention @everyone, @here and All Roles`,
      [PermissionFlagsBits.ManageMessages]:        `Manage Messages`,
      [PermissionFlagsBits.ManageThreads]:         `Manage Threads`,
      [PermissionFlagsBits.ReadMessageHistory]:    `Read Message History`,
      [PermissionFlagsBits.SendTTSMessages]:       `Send Text-to-speech Messages`,
      [PermissionFlagsBits.SendVoiceMessages]:     `Send Voice Messages`,
      [PermissionFlagsBits.SendPolls]:             `Create Polls`,

      // voice channel permissions
      [PermissionFlagsBits.Connect]:               `Connect`,
      [PermissionFlagsBits.Speak]:                 `Speak`,
      [PermissionFlagsBits.Stream]:                `Video`,
      [PermissionFlagsBits.UseSoundboard]:         `Use Soundboard`,
      [PermissionFlagsBits.UseExternalSounds]:     `Use External Sounds`,
      [PermissionFlagsBits.UseVAD]:                `Use Voice Activity`,
      [PermissionFlagsBits.PrioritySpeaker]:       `Priority Speaker`,
      [PermissionFlagsBits.MuteMembers]:           `Mute Members`,
      [PermissionFlagsBits.DeafenMembers]:         `Deafen Members`,
      [PermissionFlagsBits.MoveMembers]:           `Move Members`,
      [0x0001000000000000]:                        `Set Voice Channel Status`,

      // apps permissions
      [PermissionFlagsBits.UseApplicationCommands]: `Use Application Commands`,
      [PermissionFlagsBits.UseEmbeddedActivities]:  `Use Activities`,
      [PermissionFlagsBits.UseExternalApps]:        `Use External Apps`,

      // stage channel permissions
      [PermissionFlagsBits.RequestToSpeak]: `Request to Speak`,

      // events permissions
      [PermissionFlagsBits.CreateEvents]: `Create Events`,
      [PermissionFlagsBits.ManageEvents]: `Manage Events`,

      // advanced permissions
      [PermissionFlagsBits.Administrator]: `Administrator`,

      // idk
      [PermissionFlagsBits.ViewCreatorMonetizationAnalytics]: `View Creator Monetization Analytics`
   };


   // array of permission strings
   const permissionStrings = [];


   // check permissions against permissionsList
   for (const value in permissionsList) {
      const permission = permissionsList[value];

      if ((permissions & BigInt(value)) === BigInt(value))
         permissionStrings.push(permission);
   };


   // return the array of permission strings
   return permissionStrings;
};