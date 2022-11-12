import sindresorhusSlugify, { Options } from "@sindresorhus/slugify"

export const slugifyOptions: Options = {
  decamelize: false,
}

const singleSlashRegex = /\/\/+/g

/**
 * Creates a slug out of given input
 * @param input
 * @param prefix
 * @returns Slugified string
 */
export const slugify = (input: string, prefix = ``) => {
  if (!input) {
    throw new Error(`slugify requires an input`)
  }

  const slug = sindresorhusSlugify(input, slugifyOptions)
  const slugifiedPrefix = sindresorhusSlugify(prefix, slugifyOptions)

  return `/${slugifiedPrefix}/${slug}`.replace(singleSlashRegex, `/`)
}
