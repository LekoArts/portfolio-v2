import { GatsbyNode } from "gatsby"
import path from "path"

type CreatePagesResult = {
  redirects: {
    nodes: Array<{
      fromPath: string
      toPath: string
    }>
  }
  garden: {
    nodes: Array<{
      id: string
      slug: string
      contentFilePath: string
    }>
  }
  writing: {
    nodes: Array<{
      id: string
      slug: string
      type: "prose" | "tutorial"
      contentFilePath: string
    }>
  }
}

const gardenTemplate = path.resolve(`src/templates/garden.tsx`)
const proseTemplate = path.resolve(`src/templates/prose.tsx`)
const tutorialTemplate = path.resolve(`src/templates/tutorial.tsx`)
const playgroundTemplate = path.resolve(`src/templates/playground.tsx`)

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createRedirect, createPage } = actions

  const result = await graphql<CreatePagesResult>(`
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

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading the createPages query results`, result.errors)
    return
  }

  const {
    data: { redirects, garden, writing },
  } = result

  redirects.nodes.forEach((redirect) => {
    createRedirect({ isPermanent: true, ...redirect, force: true })
  })

  if (process.env.gatsby_executing_command === `develop`) {
    createPage({
      path: `/playground`,
      component: playgroundTemplate,
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

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ stage, actions, getConfig }) => {
  if (stage === `develop` || stage === `build-javascript`) {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find((plugin) => plugin.constructor.name === `MiniCssExtractPlugin`)
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
    actions.replaceWebpackConfig(config)
  }
}
