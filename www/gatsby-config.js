// We register the TypeScript evaluator in gatsby-config so we don't need to do
// it in any other .js file.
require(`ts-node`).register({ transpileOnly: true, files: true })

// Use a TypeScript version of gatsby-config.js.
module.exports = require(`./gatsby-config.ts`)
