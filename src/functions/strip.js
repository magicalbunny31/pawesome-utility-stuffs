module.exports = (text, ...values) =>
   text
      .reduce((acc, str, i) => acc + values[i - 1] + str)
      .trim()
      .split(`\n`)
      .map(text => text.trim())
      .join(`\n`);