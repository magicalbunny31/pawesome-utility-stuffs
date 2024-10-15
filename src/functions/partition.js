module.exports = (array, condition) => array.reduce(([ pass, fail ], element, index, array) =>
   condition(element, index, array) ? [[ ...pass, element ], fail ] : [ pass, [ ...fail, element ]],
   [[], []]
);