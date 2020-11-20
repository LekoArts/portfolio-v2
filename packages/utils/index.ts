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
  // eslint-disable-next-line no-param-reassign
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

/**
 * Use the Fisher–Yates algorithm to shuffle an array
 * @param array - Input array
 * @param id - Used for seeding the result
 * @returns A seeded shuffled array
 */
export const shuffle = <T>(array: T[], id: string): T[] => {
  let seed = new Prando(id).nextInt(0, 1000)
  let m = array.length
  let t
  let i

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--)

    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
    // eslint-disable-next-line no-param-reassign
    ++seed
  }

  return array
}

export { withDefaults } from "./with-defaults"
