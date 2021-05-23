import { site } from "./meta"

export const identity = {
  "@id": `${site.url}/#identity`,
  "@type": `Organization`,
  alternateName: `LekoArts`,
  description: site.description,
  email: `hello@lekoarts.de`,
  founder: `Lennart Jörgens`,
  foundingDate: `2017-12-08`,
  image: {
    "@type": `ImageObject`,
    height: `1024`,
    url: `${site.url}/social/logo-1024w.png`,
    width: `1024`,
  },
  logo: {
    "@type": `ImageObject`,
    height: `60`,
    url: `${site.url}/social/logo-60w.png`,
    width: `60`,
  },
  name: site.titleDefault,
  sameAs: [
    `https://twitter.com/lekoarts_de`,
    `https://www.youtube.com/c/LeKoArtsDE`,
    `https://github.com/LekoArts`,
    `https://dribbble.com/LekoArts`,
    `https://www.behance.net/lekoarts`,
  ],
  url: site.url,
}

export const creator = {
  "@id": `${site.url}/#creator`,
  "@type": `Organization`,
  alternateName: `LekoArts`,
  description: site.description,
  email: `hello@lekoarts.de`,
  founder: `Lennart Jörgens`,
  foundingDate: `2017-12-08`,
  image: {
    "@type": `ImageObject`,
    height: `1024`,
    url: `${site.url}/social/logo-1024w.png`,
    width: `1024`,
  },
  logo: {
    "@type": `ImageObject`,
    height: `60`,
    url: `${site.url}/social/logo-60w.png`,
    width: `60`,
  },
  name: site.titleDefault,
  url: site.url,
}

export type BreadcrumbListItem = {
  url: string
  name: string
}

export const breadcrumbList = (items: BreadcrumbListItem[]) => {
  const homeLevel = {
    "@type": `ListItem`,
    item: {
      "@id": site.url,
      name: `Homepage`,
    },
    position: 1,
  }
  const nestedLevels = items.map((item, index) => ({
    "@type": `ListItem`,
    item: {
      "@id": `${site.url}${item.url}`,
      name: item.name,
    },
    position: index + 2,
  }))
  return {
    "@context": `https://schema.org`,
    "@type": `BreadcrumbList`,
    description: `Breadcrumbs list`,
    itemListElement: [homeLevel, ...nestedLevels],
    name: `Breadcrumbs`,
  }
}

type ArticleProps = {
  category: {
    name: string
    slug: string
  }
  post: {
    title: string
    description: string
    slug: string
    date: string
    lastUpdated: string
    year: string
    image: string
  }
  isGarden: boolean
}

export const article = ({ category, post, isGarden }: ArticleProps) => ({
  "@context": `https://schema.org`,
  "@graph": [
    identity,
    creator,
    {
      "@type": `Article`,
      articleSection: isGarden ? `Digital Garden` : `Writing`,
      author: { "@id": `${site.url}/#identity` },
      copyrightHolder: { "@id": `${site.url}/#identity` },
      copyrightYear: post.year,
      creator: { "@id": `${site.url}/#creator` },
      dateModified: post.lastUpdated,
      datePublished: post.date,
      description: post.description,
      genre: category.name,
      headline: post.title,
      image: {
        "@type": `ImageObject`,
        url: `${site.url}${post.image}`,
      },
      inLanguage: `en-US`,
      mainEntityOfPage: `${site.url}${post.slug}`,
      name: post.title,
      publisher: { "@id": `${site.url}/#creator` },
      url: `${site.url}${post.slug}`,
    },
    breadcrumbList([
      { name: category.name, url: category.slug },
      { name: post.title, url: post.slug },
    ]),
  ],
})

export const homepage = {
  "@context": `https://schema.org`,
  "@graph": [
    identity,
    creator,
    {
      "@type": `WebPage`,
      author: { "@id": `${site.url}/#identity` },
      copyrightHolder: { "@id": `${site.url}/#identity` },
      copyrightYear: `2017`,
      creator: { "@id": `${site.url}/#creator` },
      datePublished: `2017-12-08T23:33:12-05:00`,
      description: site.description,
      headline: site.titleDefault,
      image: {
        "@type": `ImageObject`,
        url: `${site.url}${site.image}`,
      },
      inLanguage: `en-US`,
      mainEntityOfPage: site.url,
      name: site.titleDefault,
      publisher: { "@id": `${site.url}/#creator` },
      url: site.url,
    },
    breadcrumbList([]),
  ],
}
