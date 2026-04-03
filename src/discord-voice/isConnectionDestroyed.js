import { VoiceConnectionStatus } from "@discordjs/voice";


/**
 * @param {import("@discordjs/voice").VoiceConnection} connection
 * @returns {boolean}
 */
export default connection => connection.state.status === VoiceConnectionStatus.Destroyed;