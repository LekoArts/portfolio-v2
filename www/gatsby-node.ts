import { GatsbyNode } from "gatsby"

type CreatePagesResult = {
  redirects: {
    nodes: {
      fromPath: string
      toPath: string
    }[]
  }
  garden: {
    nodes: {
      id: string
    }[]
  }
  writing: {
    nodes: {
      id: string
      type: "prose" | "tutorial"
    }[]
  }
}

const gardenTemplate = require.resolve(`./src/templates/garden.tsx`)
const proseTemplate = require.resolve(`./src/templates/prose.tsx`)
const tutorialTemplate = require.resolve(`./src/templates/tutorial.tsx`)

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
        }
      }
      writing: allPost(filter: { published: { eq: true } }) {
        nodes {
          id
          type
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading the createPages query results`, result.errors)
    return
  }

  result.data.redirects.nodes.forEach((redirect) => {
    createRedirect({ isPermanent: true, ...redirect, force: true })
  })

  result.data.garden.nodes.forEach((garden) => {
    createPage({
      path: garden.id,
      component: gardenTemplate,
      context: {
        id: garden.id,
      },
    })
  })

  result.data.writing.nodes.forEach((article) => {
    const component = article.type === `tutorial` ? tutorialTemplate : proseTemplate

    createPage({
      path: article.id,
      component,
      context: {
        id: article.id,
      },
    })
  })
}
