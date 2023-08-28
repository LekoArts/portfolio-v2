import path from "path"
import Prando from "prando"
import get from "lodash.get"
import readingTime from "reading-time"
import { shuffle } from "./src/utils/shuffle.mjs"
import { mdxResolverPassthrough } from "./src/utils/mdx-resolver-passthrough.mjs"
import { slugify } from "./src/utils/slugify.mjs"
import { withDefaults } from "./src/utils/with-defaults.mjs"
import { site } from "./src/constants/meta.mjs"

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
export const createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions

  const getFieldValue = (fieldName, source) => get(source, fieldName)

  createFieldExtension({
    name: `slugify`,
    args: {
      prefixFieldName: `String`,
      prefix: `String`,
      inputFallback: `String`,
    },
    extend({ prefixFieldName, prefix, inputFallback }) {
      return {
        resolve(source) {
          const computedPrefix = prefixFieldName ? getFieldValue(prefixFieldName, source) : prefix
          const computedInput = (source.slug ? source.slug : source.title) || getFieldValue(inputFallback, source)
          return slugify(computedInput, computedPrefix)
        },
      }
    },
  })

  createFieldExtension({
    name: `mdxpassthrough`,
    args: {
      fieldName: `String!`,
    },
    extend({ fieldName }) {
      return {
        resolve: mdxResolverPassthrough(fieldName),
      }
    },
  })

  createTypes(`#graphql
    enum PostTypeEnum {
      prose
      tutorial
    }

    interface Post implements Node {
      id: ID!
      slug: String! @slugify(prefixFieldName: "category")
      excerpt(pruneLength: Int = 160): String!
      tableOfContents: JSON
      timeToRead: Int
      image: String
      category: Category! @link(by: "name")
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      description: String
      published: Boolean
      subtitle: String
      title: String!
      type: PostTypeEnum!
      contentFilePath: String!
    }

    type MdxPost implements Node & Post {
      slug: String! @slugify(prefixFieldName: "category")
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      tableOfContents: JSON @mdxpassthrough(fieldName: "tableOfContents")
      timeToRead: Int
      image: String
      category: Category! @link(by: "name")
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      description: String
      published: Boolean
      subtitle: String
      title: String!
      type: PostTypeEnum!
      contentFilePath: String!
    }

    type Category implements Node {
      name: String!
      slug: String! @slugify(inputFallback: "name")
      posts: [Post] @link(by: "category.name", from: "name")
      description: String!
      gradient: String!
      image: File @fileByRelativePath
    }

    interface Garden implements Node {
      id: ID!
      slug: String! @slugify(prefix: "garden")
      description: String
      excerpt(pruneLength: Int = 160): String!
      timeToRead: Int
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      tags: [String!]!
      icon: String!
      contentFilePath: String!
      image: String
    }

    type MdxGarden implements Node & Garden {
      slug: String! @slugify(prefix: "garden")
      description: String
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      timeToRead: Int
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      tags: [String!]!
      icon: String!
      contentFilePath: String!
      image: String
    }

    type CoreConfig implements Node {
      writingSource: String
      gardenSource: String
    }

    type github implements Node {
      repository(name: String, owner: String): Repository
    }

    type Repository {
      stargazerCount: Int
      description: String
      name: String
      url: String
    }

    type FlickrPhotosetsList implements Node {
      _id: String
      title: String
      content: [FlickrPhotosetsPhotos] @link(by: "photoset_id", from: "_id")
      date_update: Date @dateformat
    }

    type FlickrPhotosetsPhotos implements Node {
      title: String
      _id: String
      photoset_id: String
      description: String
      imageUrls: FlickrImageUrls
      datetaken: Date @dateformat
    }

    type FlickrImageUrls {
      _1024px: FlickrImageUrlsContent
    }

    type FlickrImageUrlsContent {
      url: String
      width: Int
      height: Int
    }
  `)
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
export const onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  if (node.internal.type !== `Mdx`) {
    return
  }
  if (!node.parent) {
    return
  }

  const { createNode, createParentChildLink } = actions
  const { writingSource, gardenSource } = withDefaults({})

  const fileNode = getNode(node.parent)

  if (!fileNode) {
    return
  }

  const source = fileNode.sourceInstanceName
  const timeToRead = Math.round(readingTime(node.body).minutes)

  if (source === writingSource) {
    /** @type {WritingNode} */
    const f = node.frontmatter
    /** @type {WritingNode} */
    const fieldData = {
      slug: f.slug ? f.slug : undefined,
      title: f.title,
      subtitle: f.subtitle ? f.subtitle : undefined,
      date: f.date,
      lastUpdated: f.lastUpdated ? f.lastUpdated : f.date,
      category: f.category,
      image: f.image ? f.image : undefined,
      description: f.description,
      published: f.published ?? true,
      type: f.type,
      contentFilePath: fileNode.absolutePath,
      timeToRead,
    }

    const mdxPostId = createNodeId(`${node.id} >>> MdxPost`)

    createNode({
      ...fieldData,
      id: mdxPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Post interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxPostId) })
  }

  if (source === gardenSource) {
    /** @type {GardenNode} */
    const f = node.frontmatter
    /** @type {GardenNode} */
    const fieldData = {
      slug: f.slug ? f.slug : undefined,
      description: f.description,
      title: f.title,
      date: f.date,
      lastUpdated: f.lastUpdated ? f.lastUpdated : f.date,
      icon: f.icon,
      tags: f.tags,
      contentFilePath: fileNode.absolutePath,
      timeToRead,
      image: f.image ? f.image : site.defaultGardenOgImage,
    }

    const mdxGardenId = createNodeId(`${node.id} >>> MdxGarden`)

    createNode({
      ...fieldData,
      id: mdxGardenId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxGarden`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Garden interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxGardenId) })
  }
}

/**
 * @typedef {{
 *   slug?: string
 *   image?: string
 *   category: "Community" | "Design" | "JavaScript" | "React" | "Writing"
 *   date: string
 *   lastUpdated?: string
 *   description: string
 *   published: boolean
 *   subtitle?: string
 *   title: string
 *   type: "prose" | "tutorial"
 *   contentFilePath: string
 *   timeToRead: number
 * }} WritingNode
 */

/**
 * @typedef {{
 *   slug?: string
 *   description: string
 *   date: string
 *   lastUpdated?: string
 *   title: string
 *   tags: Array<string>
 *   icon: string
 *   contentFilePath: string
 *   timeToRead: number
 *   image: string
 * }} GardenNode
 */

/**
 * @type {import('gatsby').GatsbyNode['createResolvers']}
 */
export const createResolvers = (createResolverArgs) => {
  const resolvers = {
    Query: {
      randomPosts: {
        type: [`Post`],
        args: {
          count: {
            type: `Int`,
            description: `Count of how many nodes should be returned`,
          },
          seed: {
            type: `String`,
            description: `Input a seed (e.g. the current id of the node) to deterministically retrieve the same nodes on every run`,
          },
        },
        async resolve(_source, args, context) {
          const { count = 2, seed } = args || {}
          const rng = new Prando(seed)
          const s = rng.next()
          const { entries } = await context.nodeModel.findAll({
            query: {
              sort: {
                fields: [`date`],
                order: [`ASC`],
              },
            },
            type: `Post`,
          })
          const allNodes = Array.from(entries)
          rng.reset()
          return shuffle(allNodes, s, count)
        },
      },
    },
  }

  createResolverArgs.createResolvers(resolvers)
}

/**
 * @typedef {{
 *   errors: Array<Error>,
 *   data: {
 *    redirects: {
 *     nodes: Array<{
 *       fromPath: string,
 *       toPath: string,
 *     }>
 *   }
 *   garden: {
 *     nodes: Array<{
 *       id: string,
 *       slug: string,
 *       contentFilePath: string,
 *     }>
 *   }
 *   writing: {
 *     nodes: Array<{
 *       id: string,
 *       slug: string,
 *       type: "prose" | "tutorial",
 *       contentFilePath: string,
 *     }>
 *   }
 *  }
 * }} CreatePagesResult
 */

const gardenTemplate = path.resolve(`src/templates/garden.tsx`)
const proseTemplate = path.resolve(`src/templates/prose.tsx`)
const tutorialTemplate = path.resolve(`src/templates/tutorial.tsx`)
const kitchenSinkTemplate = path.resolve(`src/templates/kitchen-sink.tsx`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
export const createPages = async ({ graphql, actions, reporter }) => {
  const { createRedirect, createPage } = actions

  /** @type {CreatePagesResult} */
  const result = await graphql(`
    {
      redirects: allRedirects {
        nodes {
          fromPath
          toPath
        }
      }
      garden: allGarden {
        nodes {
          id
          slug
          contentFilePath
        }
      }
      writing: allPost(filter: { published: { eq: true } }) {
        nodes {
          id
          slug
          type
          contentFilePath
        }
      }
    }
  `)

  if (result.errors || !result.data) {
    reporter.panicOnBuild(`There was an error loading the createPages query results`, result.errors)
    return
  }

  const {
    data: { redirects, garden, writing },
  } = result

  redirects.nodes.forEach((redirect) => {
    createRedirect({ isPermanent: true, ...redirect, force: true })
  })

  if (process.env.gatsby_executing_command === `develop` || process.env.IS_PLAYWRIGHT) {
    createPage({
      path: `/kitchen-sink`,
      component: kitchenSinkTemplate,
      context: {},
    })
  }

  garden.nodes.forEach((post) => {
    createPage({
      path: post.slug,
      component: `${gardenTemplate}?__contentFilePath=${post.contentFilePath}`,
      context: {
        id: post.id,
      },
    })
  })

  writing.nodes.forEach((article) => {
    const writingTemplate = article.type === `tutorial` ? tutorialTemplate : proseTemplate

    createPage({
      path: article.slug,
      component: `${writingTemplate}?__contentFilePath=${article.contentFilePath}`,
      context: {
        id: article.id,
      },
    })
  })
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateWebpackConfig']}
 */
export const onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === `develop` || stage === `build-javascript`) {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find((plugin) => plugin.constructor.name === `MiniCssExtractPlugin`)
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
    actions.replaceWebpackConfig(config)
  }
}
