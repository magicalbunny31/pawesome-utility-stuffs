import destroyConnection from "./destroyConnection.js";
import isConnectionDestroyed from "./isConnectionDestroyed.js";
import wait from "../wait.js";

import { entersState, getVoiceConnection, joinVoiceChannel, VoiceConnectionDisconnectReason, VoiceConnectionStatus } from "@discordjs/voice";


/**
 * @param {import("@discordjs/voice").DiscordGatewayAdapterCreator} voiceAdapterCreator
 * @param {import("discord.js").Snowflake} channelId
 * @param {import("discord.js").Snowflake} guildId
 * @param {boolean} [selfDeaf=true]
 * @param {boolean} [selfMute=true]
 * @returns {import("@discordjs/voice").VoiceConnection}
 */
export default (voiceAdapterCreator, channelId, guildId, selfDeaf = true, selfMute = true) => {
   /**
    * try and prevent zombie connections that can break this logic
    * this can occur when the bot was restarted and attempts to reconnect to a voice channel it was previously in (but the bot never had the chance to automatically disconnect due to the previous terminated process)
    */
   const existingConnection = getVoiceConnection(guildId);
   if (existingConnection)
      existingConnection.destroy();

   const connection = joinVoiceChannel({
      adapterCreator: voiceAdapterCreator,
      channelId,
      guildId,
      selfDeaf,
      selfMute
   });

   /**
    * the library should handle reconnecting by itself
    * however in the case of potentially reconnectable disconnects, we'll handle that here
    * also, for auto-disconnects, see voiceChannelDisconnector
    */

   let isWaitingForReady = false;

   connection.on(`stateChange`, async (_oldState, newState) => {
      if (newState.status === VoiceConnectionStatus.Disconnected) { // the connection was been severed and the bot has been disconnected for some reason

         if (newState.reason === VoiceConnectionDisconnectReason.WebSocketClose && newState.closeCode === 4014) {
            /**
             * if the close code is 4014 (Disconnected, https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice-voice-close-event-codes)...
             *    the bot may have switched voice channels (the library will automatically attempt to reconnect)
             *    the bot was kicked from the voice channel (don't try to reconnect)
             *    something else happened to the bot (don't try to reconnect)
             */
            // depending on what happened, the bot may reconnect and we can ignore this disconnect ever happened!
            try {
               await Promise.race([ // see if the voice state changes to Signalling (trying to rejoin the voice channel) or Connecting (trying to resume the existing connection) automatically, if not then one of these Promises will reject
                  entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                  entersState(connection, VoiceConnectionStatus.Connecting, 5_000)
               ]);
               // seems like the library is handling the reconnect, let's ignore it
            } catch {
               // seem like a disconnect where we shouldn't attempt to recover it
               destroyConnection(connection);
            };

         } else if (connection.rejoinAttempts < 5) {
            /**
             * the app has been attempting to reconnect
             * we'll wait, with a linear backoff strategy, before attempting to rejoin the voice channel (with a max of 5 attempts)
             */
            await wait((connection.rejoinAttempts + 1) * 1000);
            if (!isConnectionDestroyed(connection)) // make sure that the connection didn't get destroyed whilst waiting
               connection.rejoin();

         } else {
            /**
             * welp, we did all we can chef - just disconnect at this point
             */
            destroyConnection(connection);
         };

      } else if (!isWaitingForReady && [ VoiceConnectionStatus.Connecting, VoiceConnectionStatus.Signalling ].includes(newState.status)) {
         /**
          * the bot is currently connecting to the channel
          *    we'll wait for it to enter a ready state in 15 seconds
          *    if it doesn't enter that state in the specified timeframe then destroy the connection
          * using `isWaitingForReady` prevents this section from repeatedly running in the attempt that the bot flips from Connecting/Signalling rapidly
          */
         isWaitingForReady = true;
         try {
            await entersState(connection, VoiceConnectionStatus.Ready, 15_000);
         } catch {
            destroyConnection(connection);
         } finally {
            isWaitingForReady = false;
         };

      };

      // other state change events aren't of any concern for this logic~
   });

   return connection;
};