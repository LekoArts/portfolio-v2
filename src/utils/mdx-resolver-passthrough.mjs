/**
 * Uses currying. When providing fieldName as an argument a function will be returned that runs with this fieldName
 * @param {string} fieldName
 * @returns {(source: any, args: any, context: any, info: any) => Promise<any>} The originally requested fieldName via MDX
 */
/* istanbul ignore next */
export const mdxResolverPassthrough = (fieldName) => async (source, args, context, info) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })
  return result
}
