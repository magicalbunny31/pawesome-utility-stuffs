# 📦 pawesome-utility-stuffs

- a package that i import across all my projects for the sake of consistency!
- it also acts as a giant wrapper for a bunch of different libraries that i may use (see the [`package.json`](./package.json) for these dependencies) because i got tired of re-writing the same code logic
- made with stress using 🥕 and many cinnamon rolls


## 💻 peer dependencies

- `@magicalbunny31/pawesome-utility-stuffs`
- `@magicalbunny31/pawesome-utility-stuffs/discord`
   - [`discord.js`](https://github.com/discordjs/discord.js/tree/main/packages/discord.js)
- `@magicalbunny31/pawesome-utility-stuffs/discord-voice`
   - [`discord.js`](https://github.com/discordjs/discord.js/tree/main/packages/discord.js)
      - *whilst [`@discordjs/collection`](https://github.com/discordjs/discord.js/tree/main/packages/collection) is technically the slimmer package, [`@discordjs/collection`](https://github.com/discordjs/discord.js/tree/main/packages/collection) is also exported by [`discord.js`](https://github.com/discordjs/discord.js/tree/main/packages/discord.js)*
      - *there's absolutely no point in explicitly installing a new package when i'm already extremely likely to have [`discord.js`](https://github.com/discordjs/discord.js/tree/main/packages/discord.js) installed when using [`@discordjs/voice`](https://github.com/discordjs/discord.js/tree/main/packages/voice)~*
   - [`@discordjs/voice`](https://github.com/discordjs/discord.js/tree/main/packages/voice)
- `@magicalbunny31/pawesome-utility-stuffs/firestore`
   - [`@google-cloud/firestore`](https://github.com/googleapis/google-cloud-node/tree/main/packages/google-cloud-firestore)
- `@magicalbunny31/pawesome-utility-stuffs/fs`
   - [`file-type`](https://github.com/sindresorhus/file-type)
- `@magicalbunny31/pawesome-utility-stuffs/aws`
   - [`@aws-sdk/client-s3`](https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-s3)
   - [`@aws-sdk/lib-storage`](https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-storage)
   - [`@aws-sdk/s3-request-presigner`](https://github.com/aws/aws-sdk-js-v3/tree/main/packages/s3-request-presigner)


## ‼️ important considerations

- this is an [ecmascript modules (esm)](https://nodejs.org/api/esm.html) package
   - i haven't been using [commonjs modules (cjs)](https://nodejs.org/api/modules.html) for a long time now so there's no longer a point to providing support for it
   - still need [commonjs modules (cjs)](https://nodejs.org/api/modules.html) support for some reason? take a look at [`load-esm`](https://github.com/Borewit/load-esm)~
- by default, the package doesn't install any extra dependencies (they're all optional)
   - this is fine if you're importing the core package "`@magicalbunny31/pawesome-utility-stuffs`" but won't work if you're importing wrappers, like "`@magicalbunny31/pawesome-utility-stuffs/discord`"
   - see the **💻 setup** above for the dependencies required for each subpath
   - see [`package.json`](./package.json) for the specific version ranges that work for each dependency
- some dependencies have specific version requirements
   - i can't be bothered to list them here so see the [`package.json`](./package.json) for each specific package's requirements
- this package is built using [pnpm](https://pnpm.io/)
   - use `pnpm add` or things might get weird~
   - *that's because [pnpm](https://pnpm.io/) handles peer dependencies differently to other package managers*
- i won't provide further documentation for how to use this package as it is highly specialised for my workflow (though i hope my code is self-documenting !!)


## 🗃️ previous versions

- 🏚️ ~~[v1](https://github.com/magicalbunny31/pawesome-utility-stuffs/tree/release/v1)~~
- 🏚️ ~~[v2](https://github.com/magicalbunny31/pawesome-utility-stuffs/tree/release/v2)~~
- 🏡 **v3** (this branch!)


## 📚 license ([MIT](./license))

- see [`license`](./license)~ ✨


## contributors 👥
- 🦊 [@magicalbunny31](https://github.com/magicalbunny31) ([nuzzles.dev](https://nuzzles.dev))
