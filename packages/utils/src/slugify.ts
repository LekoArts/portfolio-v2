import sindresorhusSlugify, { Options } from "@sindresorhus/slugify"

export const slugifyOptions: Options = {
  decamelize: false,
}

const singleSlashRegex = /\/\/+/g

type SlugifyProps = {
  (source: { title: string; slug?: string }, prefix?: string): string
  (source: { slug: string; title?: string }, prefix?: string): string
}

/**
 * Creates a slug out of given title (or slug) and prefix
 * @param source
 * @param prefix
 * @returns Slugified string
 */
export const slugify: SlugifyProps = (source, prefix = ``) => {
  if (!source.title && !source.slug) {
    throw new Error(`title or slug must be provided.`)
  }

  let slug: string

  if (source.slug) {
    slug = source.slug
  } else {
    slug = sindresorhusSlugify(source.title, slugifyOptions)
  }

  const slugifiedPrefix = sindresorhusSlugify(prefix, slugifyOptions)

  return `/${slugifiedPrefix}/${slug}`.replace(singleSlashRegex, `/`)
}
