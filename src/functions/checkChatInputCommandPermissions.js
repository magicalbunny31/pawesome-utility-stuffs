/**
 * 🔎 the following code is basically spaghetti code
 * 📖 however, it's very readable !!
 * ✨ we (or i) *love* readable code~ ,':3
 * 🦊 ~ magicalbunny31
 */


module.exports = async (commandId, channel, member) => {
   // imports
   const { PermissionFlagsBits } = require("discord.js");


   // this client
   const client = channel.client;


   // this guild
   const guild = channel.guild;


   // permission constants
   const AllMembers  =           guild.id;         // the permission id for AllMembers is the guild's id
   const AllChannels = `${BigInt(guild.id) - 1n}`; // the permission id for AllChannels is the guild's id, minus 1


   // fetch application permissions for this guild
   const applicationPermissions = await (async () => {
      try {
         return await guild.commands.permissions.fetch({
            command: client.id // using the client's id fetches its application permissions
         });

      } catch {
         // no permissions set
         return [];
      };
   })();


   // fetch command permissions for this guild
   const commandPermissions = await (async () => {
      try {
         return await guild.commands.permissions.fetch({
            command: commandId
         });

      } catch {
         // no permissions set
         return [];
      };
   })();


   // fetch default_member_permissions for this command
   const defaultMemberPermissions = await (async () => {
      try {
         // this is a guild command
         const command = await guild.commands.fetch(commandId);
         return command.defaultMemberPermissions;

      } catch {
         // this is a global command
         const command = await client.application.commands.fetch(commandId);
         return command.defaultMemberPermissions;

      };
   })();


   // this member has administrator permissions: they're granted explicit permissions to use the command
   if (member.permissions.has(PermissionFlagsBits.Administrator))
      return true;


   // an array of the roles this member has, mapped by ids
   const memberRolesAsIds = member.roles.cache.map(role => role.id);


   // check default_member_permissions
   const checkDefaultMemberPermissions = () => {
      if (defaultMemberPermissions === null) { // default_member_permissions for this command is null (there are no default_member_permissions)
         return true;


      } else { // default_member_permissions for this command isn't null (there are default_member_permissions)


         if (defaultMemberPermissions.bitfield === 0n) { // default_member_permissions for this command is 0 (this command is disabled by default, except administrators)
            return false;


         } else { // default_member_permissions for this command isn't 0


            if (channel.permissionsFor(member).has(defaultMemberPermissions)) { // in the current channel, this user has guild permissions that are defined by the default_member_permissions
               return true;

            } else { // in the current channel, this user doesn't have guild permissions that are defined by the default_member_permissions
               return false;
            };


         };


      };
   };


   // check user/role permissions
   const checkUserRolePermissions = () => {
      if (commandPermissions.find(commandPermission => commandPermission.id === member.id)) { // commandPermission overrides exists for this user


         if (commandPermissions.find(commandPermission => commandPermission.id === member.id).permission) { // its value is true
            return true;

         } else { // its value is false
            return false;
         };


      } else { // commandPermission overrides doesn't exist for this user


         if (commandPermissions.filter(commandPermission => memberRolesAsIds.includes(commandPermission.id)).length) { // commandPermission overrides exists for one of this user's roles


            if (commandPermissions.filter(commandPermission => memberRolesAsIds.includes(commandPermission.id) && commandPermission.permission).length) { // commandPermission overrides for one of this user's roles is set to true
               return true;

            } else { // none of the commandPermission overrides for one of this user's roles is set to true
               return false;
            };


         } else { // commandPermission overrides doesn't exist for one of this user's roles


            if (commandPermissions.find(commandPermission => commandPermission.id === AllMembers)) { // commandPermission overrides exists for AllMembers


               if (commandPermissions.find(commandPermission => commandPermission.id === AllMembers).permission) { // its value is true
                  return true;

               } else { // its value is false
                  return false;
               };


            } else { // commandPermission overrides doesn't exist for AllMembers


               if (applicationPermissions.find(applicationPermission => applicationPermission.id === member.id)) { // applicationPermission overrides exists for this user


                  if (applicationPermissions.find(applicationPermission => applicationPermission.id === member.id).permission) { // its value is true
                     return checkDefaultMemberPermissions();

                  } else { // its value is false
                     return false;
                  };


               } else { // applicationPermission overrides doesn't exist for this user


                  if (applicationPermissions.filter(applicationPermission => memberRolesAsIds.includes(applicationPermission.id)).length) { // applicationPermission overrides exists for one of this user's roles


                     if (applicationPermissions.filter(applicationPermission => memberRolesAsIds.includes(applicationPermission.id) && applicationPermission.permission).length) { // applicationPermission overrides for one of this user's roles is set to true
                        return checkDefaultMemberPermissions();

                     } else { // none of the applicationPermission overrides for one of this user's roles is set to true
                        return false;
                     };


                  } else { // applicationPermission overrides doesn't exist for one of this user's roles


                     if (applicationPermissions.find(applicationPermission => applicationPermission.id === AllMembers)) { // applicationPermission overrides exists for AllMembers


                        if (applicationPermissions.find(applicationPermission => applicationPermission.id === AllMembers).permission) { // its value is true
                           return checkDefaultMemberPermissions();

                        } else { // its value is false
                           return false;
                        };


                     } else { // applicationPermission overrides doesn't exist for AllMembers
                        return checkDefaultMemberPermissions();
                     };


                  };


               };


            };


         };


      };
   };


   // check channel permissions
   const checkChannelPermissions = () => {
      if (commandPermissions.find(commandPermission => commandPermission.id === channel.id)) { // commandPermission overrides exists for this channel


         if (commandPermissions.find(commandPermission => commandPermission.id === channel.id).permission) { // its value is true
            return checkUserRolePermissions();

         } else { // its value is false
            return false;
         };


      } else { // commandPermission overrides doesn't exist for this channel


         if (commandPermissions.find(commandPermission => commandPermission.id === AllChannels)) { // commandPermission overrides exists for AllChannels

            if (commandPermissions.find(commandPermission => commandPermission.id === AllChannels).permission) { // value is true
               return checkUserRolePermissions();

            } else { // value is false
               return false;
            };


         } else { // commandPermission overrides doesn't exist for AllChannels


            if (applicationPermissions.find(applicationPermission => applicationPermission.id === channel.id)) { // applicationPermission overrides exists for this channel


               if (applicationPermissions.find(applicationPermission => applicationPermission.id === channel.id).permission) { // value is true
                  return checkUserRolePermissions();

               } else { // value is false
                  return false;
               };


            } else { // applicationPermission overrides doesn't exist for this channel


               if (applicationPermissions.find(applicationPermission => applicationPermission.id === AllChannels)) { // applicationPermission overrides exists for AllChannels


                  if (applicationPermissions.find(applicationPermission => applicationPermission.id === AllChannels).permission) { // its value is true
                     return checkUserRolePermissions();

                  } else { // its value is false
                     return false;
                  };


               } else { // applicationPermission overrides doesn't exist for AllChannels
                  return checkUserRolePermissions();
               };


            };


         };


      };
   };


   // oh boy, here we go !!
   return checkChannelPermissions();
};