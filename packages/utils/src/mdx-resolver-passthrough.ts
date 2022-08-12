/**
 * Uses currying. When providing fieldName as an argument a function will be returned that runs with this fieldName
 * @param fieldName
 * @returns The originally requested fieldName via MDX
 */
/* istanbul ignore next */
export const mdxResolverPassthrough = (fieldName: string) => async (source, args, context, info) => {
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
