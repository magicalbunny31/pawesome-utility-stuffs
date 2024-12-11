module.exports = text => text
   .split(`\n`)
   .map(text => text.trim())
   .join(`\n`)
   .trim();