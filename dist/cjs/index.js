const colours = require("../../src/data/colours.js");
const emoji = require("../../src/data/emoji.js");

const autoArray = require("../../src/functions/autoArray.js");
const checkChatInputCommandPermissions = require("../../src/functions/checkChatInputCommandPermissions.js");
const choice = require("../../src/functions/choice.js");
const deferComponents = require("../../src/functions/deferComponents.js");
const emojis = require("../../src/functions/emojis.js");
const findSimilar = require("../../src/functions/findSimilar.js");
const formatBytes = require("../../src/functions/formatBytes.js");
const formatPermissions = require("../../src/functions/formatPermissions.js");
const noop = require("../../src/functions/noop.js");
const number = require("../../src/functions/number.js");
const partition = require("../../src/functions/partition.js");
const respondToErrorInteraction = require("../../src/functions/respondToErrorInteraction.js");
const respondToWrongUserMessageComponentInteraction = require("../../src/functions/respondToWrongUserMessageComponentInteraction.js");
const set = require("../../src/functions/set.js");
const shuffle = require("../../src/functions/shuffle.js");
const strip = require("../../src/functions/strip.js");
const sum = require("../../src/functions/sum.js");
const tryOrUndefined = require("../../src/functions/tryOrUndefined.js");
const wait = require("../../src/functions/wait.js");


module.exports = {
   colours,
   emoji,

   autoArray,
   checkChatInputCommandPermissions,
   choice,
   deferComponents,
   emojis,
   findSimilar,
   formatBytes,
   formatPermissions,
   noop,
   number,
   partition,
   respondToErrorInteraction,
   respondToWrongUserMessageComponentInteraction,
   set,
   shuffle,
   strip,
   sum,
   tryOrUndefined,
   wait
};