import { CreateNodeArgs, GatsbyNode, PluginOptions } from "gatsby"
import kebabCase from "lodash.kebabcase"
import Prando from "prando"
import { mdxResolverPassthrough, slugify, withDefaults, shuffle } from "utils"

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }, themeOptions): any => {
  const { createTypes, createFieldExtension } = actions

  const { writingPrefix } = withDefaults(themeOptions)

  createFieldExtension({
    name: `slugify`,
    extend() {
      return {
        resolve(source) {
          return slugify(source, writingPrefix)
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
    interface Post @nodeInterface {
      id: ID!
      slug: String! @slugify
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
      timeToRead: Int
      tags: [PostTag]
      banner: File @fileByRelativePath
      description: String
    }

    type PostTag {
      name: String
      slug: String
    }

    type MdxPost implements Node & Post {
      slug: String! @slugify
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
      tags: [PostTag]
      banner: File @fileByRelativePath
      description: String
    }

    type CoreConfig implements Node {
      writingSource: String
      writingPath: String
      writingPrefix: String
      tagPath: String
      tagPrefix: String
      formatString: String
    }
  `)
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

type BlogNode = {
  frontmatter: {
    slug?: string
    title: string
    date: string
    tags: string[]
    banner: string
    description: string
  }
}

export const onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest }: CreateNodeArgs<BlogNode>,
  themeOptions: PluginOptions
): void => {
  if (node.internal.type !== `Mdx`) {
    return
  }

  const { createNode, createParentChildLink } = actions
  const { writingSource } = withDefaults(themeOptions)

  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (node.internal.type === `Mdx` && source === writingSource) {
    let modifiedTags

    if (node.frontmatter.tags) {
      modifiedTags = node.frontmatter.tags.map((tag) => ({
        name: tag,
        slug: kebabCase(tag),
      }))
    } else {
      modifiedTags = null
    }

    const fieldData = {
      slug: node.frontmatter.slug ? node.frontmatter.slug : undefined,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      tags: modifiedTags,
      banner: node.frontmatter.banner,
      description: node.frontmatter.description,
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
