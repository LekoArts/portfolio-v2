import sindresorhusSlugify from "@sindresorhus/slugify"

/**
 * @type {import('@sindresorhus/slugify').Options}
 */
export const slugifyOptions = {
  decamelize: false,
}

const singleSlashRegex = /\/\/+/g

/**
 * Creates a slug out of given input
 * @param {string} input
 * @returns {string} Slugified string
 */
export const slugify = (input, prefix = ``) => {
  if (!input) {
    throw new Error(`slugify requires an input`)
  }

  const slug = sindresorhusSlugify(input, slugifyOptions)
  const slugifiedPrefix = sindresorhusSlugify(prefix, slugifyOptions)

  return `/${slugifiedPrefix}/${slug}`.replace(singleSlashRegex, `/`)
}
