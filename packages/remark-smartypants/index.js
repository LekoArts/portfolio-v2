const retext = require(`retext`)
const visit = require(`unist-util-visit`)
const smartypants = require(`retext-smartypants`)

const remarkSmartypants = (options) => {
  const processor = retext().use(smartypants, options)
  return (tree) => {
    visit(tree, `text`, (node) => {
      node.value = String(processor.processSync(node.value))
    })
  }
}

module.exports = remarkSmartypants
