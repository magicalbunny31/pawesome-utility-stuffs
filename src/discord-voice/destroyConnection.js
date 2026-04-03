import isConnectionDestroyed from "./isConnectionDestroyed.js";


/**
 * @param {import("@discordjs/voice").VoiceConnection} connection
 * @returns {void}
 */
export default connection => {
   if (!isConnectionDestroyed(connection))
      connection.destroy();
};