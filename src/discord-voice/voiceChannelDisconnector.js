import destroyConnection from "./destroyConnection.js";

import { Collection } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";


class VoiceChannelDisconnector {
   constructor() {
      this.#timeouts = new Collection();
   };


   /**
    * @type {import("discord.js").Collection<import("discord.js").Snowflake, NodeJS.Timeout>}
    */
   #timeouts;


   /**
    * how long the bot stays in a voice channel alone before leaving (default 1 minute)
    */
   #delay = 60 * 1_000;


   /**
    * @param {import("discord.js").Snowflake} guildId
    */
   #setTimeout(guildId) {
      // create the timeout
      const timeout = setTimeout(() => {
         const connection = getVoiceConnection(guildId);
         if (connection)
            destroyConnection(connection);
      }, this.#delay);

      // set the timeout
      this.#timeouts.set(guildId, timeout);
   };


   /**
    * @param {import("discord.js").Snowflake} guildId
    * @returns {NodeJS.Timeout?}
    */
   #getTimeout(guildId) {
      return this.#timeouts.get(guildId);
   };


   /**
    * @param {import("discord.js").Snowflake} guildId
    */
   #deleteTimeout(guildId) {
      this.#timeouts.delete(guildId);
   };


   /**
    * @param {import("discord.js").VoiceState} oldState
    * @param {import("discord.js").VoiceState} newState
    */
   event(oldState, newState) {
      // the bot isn't in the voice channel of this VoiceState
      if (!(newState.channel?.members.get(newState.client.user.id) ?? oldState.channel?.members.get(newState.client.user.id)))
         return;

      // this guild
      const guildId = newState.guild.id ?? oldState.guild.id;

      // the bot is alone in the voice channel, create a timeout for the bot leave this voice channel in this.#delay
      if (newState.channel?.members.size === 1 || oldState.channel?.members.size === 1)
         this.#setTimeout(guildId);

      // the bot isn't alone in the voice channel
      else {
         const timeout = this.#getTimeout(guildId);
         if (timeout)
            clearTimeout(timeout);
         else
            this.#deleteTimeout(guildId);
      };
   };
};


export default new VoiceChannelDisconnector();