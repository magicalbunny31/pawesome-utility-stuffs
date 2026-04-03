/**
 * @template T
 * @param {T[]} array
 * @param {(value?: T, index?: number, array?: T[]) => boolean} condition
 * @returns {[ T[], T[] ]}
 */
export default (array, condition) => array.reduce(([ pass, fail ], element, index, array) =>
   condition(element, index, array) ? [[ ...pass, element ], fail ] : [ pass, [ ...fail, element ]],
   [[], []]
);