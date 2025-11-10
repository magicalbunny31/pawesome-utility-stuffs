import { ApplicationEmoji, GuildMember, GuildTextBasedChannel, Interaction, MessageComponent, MessageComponentInteraction, PermissionFlagsBits, User } from "discord.js";


/**
 * 🎨 (decimal) colours that i use more than once across all projects
 * @example
 * colours.bunny_gold;
 * // => 14988288
 */
export const colours: typeof import("../src/data/colours.js");


/**
 * 🔁 automatically create an array with values filled from function
 * @param length #️⃣ how long this array should be
 * @param func 📃 function to run for each element of this array
 * @example
 * autoArray(5, () => `bunny`);
 * // => [ `bunny`, `bunny`, `bunny`, `bunny`, `bunny` ]
 */
export function autoArray<T>(length: number, func: (value?: T, index?: number) => T): T[];


/**
 * 🔓 check if a member has permissions to use a (discord) chat-input application command
 * @param commandId 🔎 id of the command to view permissions of
 * @param channel 💬 channel to check permissions against
 * @param member 👤 member to check permissions against
 * @see https://nuzzles.dev/assets/discord/other/application-command-permissions-flowchart.png
 * @example
 * checkChatInputCommandPermissions(`490178047325110282`, channel, user);
 * // => true
 */
export async function checkChatInputCommandPermissions(commandId: string, channel: GuildTextBasedChannel, member: GuildMember): Promise<boolean>;


/**
 * ❓ get a random element from an `Array`
 * @param array 📃 `Array` to get a random element from
 * @example
 * choice([ `🐰`, `🦊`, `🐺`, `🦌` ]);
 * // => `🦊`
 */
export function choice<T>(array: T[]): T;

/**
 * ❓ get random elements from an `Array`
 * @param array 📃 `Array` to get random elements from
 * @param choices 🔢 number of elements to get (default `1`)
 * @example
 * choice([ `🐰`, `🦊`, `🐺`, `🦌` ], 2);
 * // => [ `🦊`, `🦌` ]
 */
export function choice<T>(array: T[], choices: number): T[];


/**
 * 💭 set a [Button](https://discord.com/developers/docs/components/reference#button) component to a "deferred" state in a list of message `components`
 * @param customId 🆔 custom_id of the [Button](https://discord.com/developers/docs/components/reference#button) component to set to a "deferred" state
 * @param components 📋 all `component`s of the message
 */
export function deferComponents(customId: string, components: MessageComponent[]): MessageComponent[];

/**
 * 💭 set a [String Select](https://discord.com/developers/docs/components/reference#string-select), [User Select](https://discord.com/developers/docs/components/reference#user-select), [Role Select](https://discord.com/developers/docs/components/reference#role-select), [Mentionable Select](https://discord.com/developers/docs/components/reference#mentionable-select), or [Channel Select](https://discord.com/developers/docs/components/reference#channel-select) component to a "deferred" state in a list of message `components`
 * @param customId 🆔 custom_id of the [String Select](https://discord.com/developers/docs/components/reference#string-select), [User Select](https://discord.com/developers/docs/components/reference#user-select), [Role Select](https://discord.com/developers/docs/components/reference#role-select), [Mentionable Select](https://discord.com/developers/docs/components/reference#mentionable-select), or [Channel Select](https://discord.com/developers/docs/components/reference#channel-select) component to display as deferred
 * @param components 📋 all `component`s of the message
 * @param values 👉 values of the [String Select](https://discord.com/developers/docs/components/reference#string-select), [User Select](https://discord.com/developers/docs/components/reference#user-select), [Role Select](https://discord.com/developers/docs/components/reference#role-select), [Mentionable Select](https://discord.com/developers/docs/components/reference#mentionable-select), or [Channel Select](https://discord.com/developers/docs/components/reference#channel-select) component that were selected
 */
export function deferComponents(customId: string, components: MessageComponent[], values: string[]): MessageComponent[];


/**
 * 🦊 discord-formatted emoji strings
 * @param applicationEmojis 🤖 array of this app's `ApplicationEmoji`s - don't specify this argument to only return emojis from guilds
 * @returns ❓ this returns an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) combining this app's `ApplicationEmoji`s (optional) and emojis from guilds
 */
export function emojis(applicationEmojis?: ApplicationEmoji[]): { [emojiName: string]: string };


/**
 * 📋 find similar strings/objects based off of a string
 *
 * 🔗 based off of [aceakash](https://github.com/aceakash)'s [`string-similarity`](https://github.com/aceakash/string-similarity), which is based off of the [Dice-Sørensen coefficient](https://wikipedia.org/wiki/Dice-S%c3%b8rensen_coefficient)
 * @param query 📄 `String` to query
 * @param targets 🧺 `Array` of `String`s to compare against the query parameter
 * @param settings 🔧 settings for the function
 * @see https://github.com/aceakash/string-similarity
 */
export function findSimilar(query: string, targets: string[], settings: {
   /**
    * 🔢 max amount of results to return
    */
   limit?: number;

   /**
    * 🗯️ filter out results with a score below this target
    */
   minScore?: number;
}): { score: number, target: string }[];


/**
 * 📋 find similar strings/objects based off of a string
 *
 * 🔗 based off of [aceakash](https://github.com/aceakash)'s [`string-similarity`](https://github.com/aceakash/string-similarity), which is based off of the [Dice-Sørensen coefficient](https://wikipedia.org/wiki/Dice-S%c3%b8rensen_coefficient)
 * @param query 📄 `String` to query
 * @param targets 🧺 `Array` of `Object`s to compare against the query parameter
 * @param settings 🔧 settings for the function
 * @see https://github.com/aceakash/string-similarity
 */
export function findSimilar<T>(query: string, targets: T[], settings: {
   /**
    * 💬 the key of the object to access for the string
    */
   key: keyof T;

   /**
    * 🔢 max amount of results to return
    */
   limit?: number;

   /**
    * 🗯️ filter out results with a score below this target
    */
   minScore?: number;
}): { score: number, object: T }[];


/**
 * 📄 format bytes into a human-readable string
 * @param bytes 💻 bytes to convert into a human-readable string
 * @param useBytes 🔀 set to `true` if you want to use mebi- (default `false`)
 * @param decimals 🔢 amount of decimal spaces to display in the human-readable string (default `2`)
 * @see https://stackoverflow.com/a/18650828
 * @example
 * formatBytes(10000);
 * formatBytes(10240, true);
 * // => `10 KB`;
 */
export function formatBytes(bytes: number, useBytes?: boolean = false, decimals?: number = 2): string;


/**
 * 📝 formats a permission to a readable string
 * @see https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
 * @param permissionsInput 🗨️ permissions to format
 * @example
 * formatPermission([ PermissionFlagsBits.BanMembers, PermissionFlagsBits.KickMembers ]);
 * formatPermission(0x6);
 * formatPermission(0x6n);
 * // => [ `Ban Members`, `Kick Members` ]
 */
export function formatPermissions(permissionsInput: number | bigint): string[];


/**
 * 💫 glorious no operation arrow function
 * @example
 * () => {};
 */
export function noop(): void;


/**
 * 🔢 get a random number!
 * @param min ⬆️ minimum number to generate
 * @param max ⬇️ maximum number to generate
 * @example
 * number(0, 926);
 * // => 621
 */
export function number(min: number, max: number): number;


/**
 * 🔁 similar to `Array.filter()`, except elements that don't pass the condition are returned too
 * @param array 📃 `Array` to partition
 * @param condition ❓ condition to evaluate for each element
 * @returns 📄 `Array[0]`: pass; `Array[1]`: fail - try destructuring them!
 * @example
 * partition([ 1, 3, 5, 7, 9 ], num => num < 5);
 * // => [[ 1, 3 ], [ 5, 7, 9 ]]
 */
export function partition<T>(array: T[], condition: (value?: T, index?: number, array?: T[]) => boolean): [ T[], T[] ];


/**
 * ⚠️ responds to the interaction by showing the user an error message
 * @param interaction 💬 the command's interaction
 * @param guildInvite 🔗 this application's guild invite
 * @param error 📋 the error that occurred
 */
export async function respondToErrorInteraction(interaction: Interaction, guildInvite?: string = `https://nuzzles.dev/discord`, error?: Error): Promise<void>;


/**
 * 🗯️ respond to a `MessageComponentInteraction` explaining that they are not the target user to respond to this ``MessageComponent
 * @param interaction 💬 the `MessageComponentInteraction` to respond to
 * @param expectedUser 👤 the user that should be able to interact with this `MessageComponent`
 * @param receivedUser 👥 the user that ended up interacting with this `MessageComponent`
 */
export async function respondToWrongUserMessageComponentInteraction(interaction: MessageComponentInteraction, expectedUser: User, receivedUser: User): Promise<void>;


/**
 * 📤 remove duplicates from an `Array` of values
 * @param array 📃 `Array` of values (presumably with duplicates, duh)
 * @example
 * set([ `bunny`, `bun`, `bun`, `b` ]);
 * // => [ `bunny`, `bun , `b` ]
 */
export function set<T>(array: T[]): T[];


/**
 * 🔀 shuffle an `Array` in-place
 * @param array 📃 `Array` to shuffle
 * @example
 * shuffle([ `🐰`, `🦊`, `🐺`, `🦌` ]);
 * // => [ `🐺`, `🦊`, `🦌`, `🐰` ]
 */
export function shuffle<T>(array: T[]): T[];


/**
 * 🔨 strips indents off a multi-line template literals to form a formatted string
 * @param string 🗨️ template literals to strip indents off of
 * @example
 * strip`
 *    hai!
 *    hewwo!
 *    meowdy!
 * `;
 * // => `hai!\nhewwo!\nmeowdy!`
 */
export function strip(text: string): string;


/**
 * 🔢 find the sum of an  (aka a quick way of running an addition reducer function)
 * @param array 📃 `Array` of values to find the sum of (very descriptive!!)
 * @param initialValue 🏁 initial value for the reducer function
 */
export function sum<T>(array: T[], initialValue?: any = 0): T;


/**
 * ⏱️ run a (async) function and attempt return it: if it errors, return `undefined` instead of throwing an error
 * @param func 📂 the function to try and return
 * @remarks ❗ the `func` variable will be `await`ed and thus wrapped in its own [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise): `tryOrUndefined` itself will always be a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) so even if `func` is not a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) it must be treated as if it is one
 * @example
 * await tryOrUndefined(thisPromiseWillResolve(`uwu`));
 * // => `uwu`
 * await tryOrUndefined(thisPromiseWillReject(`uwu`));
 * // => undefined
 * await tryOrUndefined(thisWillResolve(`owo`));
 * // => `uwu`
 * await tryOrUndefined(thisWillReject(`owo`));
 * // => undefined
 * @returns 📄 the resolved function's returned value, or `undefined` if it errored
 */
export async function tryOrUndefined<T>(func: T): Promise<T>?;


/**
 * ⏱️ pretty much "pauses" asynchronous code
 * @param delay 🔢 delay in milliseconds to wait for
 */
export async function wait(delay: number): Promise<void>;