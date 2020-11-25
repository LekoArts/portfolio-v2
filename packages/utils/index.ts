import kebabCase from "lodash.kebabcase"
import Prando from "prando"

/**
 * Uses currying. When providing fieldName as an argument a function will be returned that runs with this fieldName
 * @param fieldName
 * @returns The originally requested fieldName via MDX
 */
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

/**
 * Creates a slug out of incoming source
 * @param source
 * @param basePath
 * @returns Slugified string
 */
export const slugify = (source: { slug: string | null; title: string }, basePath = ``): string => {
  const slug = source.slug ? source.slug : kebabCase(source.title)

  return `/${basePath}/${slug}`.replace(/\/\/+/g, `/`)
}

const random = (seed: number): number => {
  let s = seed
  const x = Math.sin(s++) * 10000
  return x - Math.floor(x)
}

/**
 * Use the Fisher–Yates algorithm to shuffle an array. The count stops the shuffle so that not the whole array needs to be iterated through.
 * @param array - Input array
 * @param seed - Used for seeding the result
 * @param count - Number of items to take out of the array
 * @returns A seeded shuffled array
 */
export const shuffle = <T>(array: T[], seed: number, count = 2): T[] => {
  let s = seed
  const m = array.length
  const maxToShuffle = Math.min(m - 1, count)

  for (let i = 0; i < maxToShuffle; i++) {
    const toSwap = i + Math.floor(random(s) * (m - i))
    ;[array[i], array[toSwap]] = [array[toSwap], array[i]]
    s++
  }

  return array.slice(0, count)
}

export { withDefaults } from "./with-defaults"
