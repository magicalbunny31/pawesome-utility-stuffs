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
 * @param strings 🗨️ template literal static parts
 * @param values 🔢 interpolated values
 * @example
 * strip`
 *    hai!
 *    hewwo!
 *    meowdy!
 * `;
 * // => `hai!\nhewwo!\nmeowdy!`
 */
export function strip(strings: TemplateStringsArray | string[], ...values: any[]): string;


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