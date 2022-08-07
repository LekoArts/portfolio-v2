import sindresorhusSlugify, { Options } from "@sindresorhus/slugify"

export const slugifyOptions: Options = {
  decamelize: false,
}

const singleSlashRegex = /\/\/+/g

/**
 * Creates a slug out of incoming source
 * @param source
 * @param prefix
 * @returns Slugified string
 */
export const slugify = (source: { slug?: string; title?: string }, prefix = ``): string => {
  if (!source.slug && !source.title) {
    return `/${sindresorhusSlugify(prefix, slugifyOptions)}`
  }

  const slug = source.slug ? source.slug : sindresorhusSlugify(source.title, slugifyOptions)
  const p = sindresorhusSlugify(prefix, slugifyOptions)

  return `/${p}/${slug}`.replace(singleSlashRegex, `/`)
}
