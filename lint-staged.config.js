module.exports = {
  "*.{js,ts,tsx,mdx,mjs}": [`eslint --ignore-path .gitignore --ignore-path .prettierignore --fix`],
  "*.{md,json,yaml}": [`prettier "**/*.{md,json,yaml}" --write`],
}
