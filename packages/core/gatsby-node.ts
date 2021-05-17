/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateNodeArgs, GatsbyNode, PluginOptions } from "gatsby"
import Prando from "prando"
import get from "lodash.get"
import { mdxResolverPassthrough, slugify, withDefaults, shuffle } from "utils"

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }): any => {
  const { createTypes, createFieldExtension } = actions

  const getFieldValue = (fieldName, source) => get(source, fieldName)

  createFieldExtension({
    name: `slugify`,
    args: {
      fieldName: `String`,
      fallback: `String`,
    },
    extend({ fieldName, fallback }) {
      return {
        resolve(source) {
          const computedPrefix = getFieldValue(fieldName, source)
          const prefix = computedPrefix || fallback
          return slugify(source, prefix)
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

  createTypes(`
    enum PostTypeEnum {
      prose
      tutorial
    }

    interface Post implements Node {
      id: ID!
      slug: String! @slugify(fieldName: "category")
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
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
    }

    type MdxPost implements Node & Post {
      slug: String! @slugify(fieldName: "category")
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
      image: String
      category: Category! @link(by: "name")
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      description: String
      published: Boolean
      subtitle: String
      title: String!
      type: PostTypeEnum!
    }

    type Category implements Node {
      name: String!
      slug: String! @slugify(fieldName: "name")
      posts: [Post] @link(by: "category.name", from: "name")
      description: String!
      gradient: String!
      image: File @fileByRelativePath
    }

    interface Garden implements Node {
      id: ID!
      slug: String! @slugify(fallback: "garden")
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
      timeToRead: Int
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      tags: [String!]!
      icon: String!
    }

    type MdxGarden implements Node & Garden {
      slug: String! @slugify(fallback: "garden")
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      tags: [String!]!
      icon: String!
    }

    type CoreConfig implements Node {
      writingSource: String
      gardenSource: String
    }
  `)
}

const replacePath = (_path: string) => (_path === `/` ? _path : _path.replace(/\/$/, ``))

export const onCreatePage: GatsbyNode["onCreatePage"] = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  return new Promise((resolve) => {
    const oldPage = { ...page }
    page.path = replacePath(page.path)
    if (page.path !== oldPage.path) {
      deletePage(oldPage)
      createPage(page)
    }
    resolve()
  })
}

export const sourceNodes: GatsbyNode["sourceNodes"] = ({ actions, createContentDigest }, themeOptions): any => {
  const { createNode } = actions
  const defaultOptions = withDefaults(themeOptions)

  createNode({
    ...defaultOptions,
    id: `gatsby-theme-core-config`,
    parent: null,
    children: [],
    internal: {
      type: `CoreConfig`,
      contentDigest: createContentDigest(defaultOptions),
      content: JSON.stringify(defaultOptions),
      description: `Options for gatsby-theme-core`,
    },
  })
}

type WritingNode = {
  frontmatter: {
    slug?: string
    image?: string
    category: "Community" | "Design" | "Gatsby" | "JavaScript" | "React"
    date: string
    lastUpdated?: string
    description: string
    published: boolean
    subtitle?: string
    title: string
    type: "prose" | "tutorial"
  }
}

type GardenNode = {
  frontmatter: {
    slug?: string
    date: string
    lastUpdated?: string
    title: string
    tags: string[]
    icon: string
  }
}

type MdxNode = WritingNode | GardenNode

export const onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest }: CreateNodeArgs<MdxNode>,
  themeOptions: PluginOptions
): void => {
  if (node.internal.type !== `Mdx`) {
    return
  }

  const { createNode, createParentChildLink } = actions
  const { writingSource, gardenSource } = withDefaults(themeOptions)

  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (source === writingSource) {
    const f = node.frontmatter as WritingNode["frontmatter"]
    const fieldData: WritingNode["frontmatter"] = {
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
    const f = node.frontmatter as GardenNode["frontmatter"]
    const fieldData: GardenNode["frontmatter"] = {
      slug: f.slug ? f.slug : undefined,
      title: f.title,
      date: f.date,
      lastUpdated: f.lastUpdated ? f.lastUpdated : f.date,
      icon: f.icon,
      tags: f.tags,
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

export const createResolvers: GatsbyNode["createResolvers"] = (createResolverArgs): any => {
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
        async resolve(source, args, context) {
          const { count = 2, seed } = args || {}
          const rng = new Prando(seed)
          const s = rng.next()
          const allNodes = await context.nodeModel.runQuery({
            query: {
              sort: {
                fields: [`date`],
                order: [`ASC`],
              },
            },
            type: `Post`,
            firstOnly: false,
          })
          rng.reset()
          return shuffle(allNodes, s, count)
        },
      },
    },
  }

  createResolverArgs.createResolvers(resolvers)
}
