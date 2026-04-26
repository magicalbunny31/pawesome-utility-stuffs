/**
 * @param {number} durationInSeconds
 * @param {Intl.LocalesArgument} [locale=`en-US`]
 */
export default (durationInSeconds, locale = `en-US`) => { // `en-US` uses oxford comma but not `en-GB`
   const durationInSecondsToUse = Math.abs(durationInSeconds);

   const format = [];
   const date = new Date(durationInSecondsToUse * 1000);

   const OneWeek = 604_800;
   const OneDay  =  86_400;

   const weeks   = Math.floor (durationInSecondsToUse / OneWeek);
   const days    = Math.floor((durationInSecondsToUse % OneWeek) / OneDay);
   const hours   = date.getUTCHours();
   const minutes = date.getUTCMinutes();
   const seconds = date.getUTCSeconds();

   if (weeks > 0)
      format.push(`${weeks} ${weeks === 1 ? `week` : `weeks`}`);
   if (days > 0)
      format.push(`${days} ${days === 1 ? `day` : `days`}`);
   if (hours > 0)
      format.push(`${hours} ${hours === 1 ? `hour` : `hours`}`);
   if (minutes > 0)
      format.push(`${minutes} ${minutes === 1 ? `minute` : `minutes`}`);
   if (seconds > 0 || format.length === 0)
      format.push(`${seconds} ${seconds === 1 ? `second` : `seconds`}`);

   return new Intl.ListFormat(locale, { style: `long`, type: `conjunction` }).format(format);
};