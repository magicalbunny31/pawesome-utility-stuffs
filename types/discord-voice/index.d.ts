import { Collection, Snowflake, VoiceState } from "discord.js";
import { DiscordGatewayAdapterCreator, VoiceConnection } from "@discordjs/voice";


/**
 * 🔉 create a voice connection in a guild's channel with voice state disconnect logic
 * @param voiceAdapterCreator 🎛️ the adapter (for this server) provided by the library used to send messages on the gateway
 * @param channelId #️⃣ the voice channel to connect to
 * @param guildId #️⃣ the guild to connect to
 * @param selfDeaf 🔇 whether the bot should join deafened
 * @param selfMute 🔇 whether the bot should join muted
 * @returns 🔉 the voice connection, once it's ready
 */
export async function createConnection(voiceAdapterCreator: DiscordGatewayAdapterCreator, channelId: Snowflake, guildId: Snowflake, selfDeaf?: boolean = true, selfMute?: boolean = true): Promise<VoiceConnection>;


/**
 * 🗑️ destroy a voice connection, if it hasn't been destroyed already
 * @param connection 🔉 the voice connection to destroy
 */
export function destroyConnection(connection: VoiceConnection): void;


/**
 * 📋 check whether a voice connection has been destroyed or not
 * @param connection 🔉 the voice connection to check
 */
export function isConnectionDestroyed(connection: VoiceConnection): boolean;


class VoiceChannelDisconnector {
   private timeouts: Collection<Snowflake, NodeJS.Timeout>;

   private delay: number;

   private setTimeout(guildId: Snowflake): void;

   private getTimeout(guildId: Snowflake): NodeJS.Timeout?;

   private deleteTimeout(guildId: Snowflake): void;

   /**
    * 🔇 voice channel connector event handler - removes the bot from voice channels across guilds if it's been alone for longer than the set `#delay` (1 minute)
    * @param oldState 💬 [discord.js](https://discord.js.org) [`VoiceState`](https://discord.js.org/docs/packages/discord.js/main/VoiceState:Class) object passed by the [`voiceStateUpdate`](https://discord.js.org/docs/packages/discord.js/main/Client:Class#voiceStateUpdate) event argument
    * @param newState 💬 [discord.js](https://discord.js.org) [`VoiceState`](https://discord.js.org/docs/packages/discord.js/main/VoiceState:Class) object passed by the [`voiceStateUpdate`](https://discord.js.org/docs/packages/discord.js/main/Client:Class#voiceStateUpdate) event argument
    */
   event(oldState: VoiceState, newState: VoiceState): void;
};

export const voiceChannelDisconnector: VoiceChannelDisconnector;