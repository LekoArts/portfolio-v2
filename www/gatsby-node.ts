import { GatsbyNode } from "gatsby"

export const onCreateBabelConfig: GatsbyNode["onCreateBabelConfig"] = ({ actions }) => {
  actions.setBabelPlugin({
    name: `babel-plugin-react-icons`,
    options: {},
  })
}

type CreatePagesResult = {
  redirects: {
    nodes: {
      fromPath: string
      toPath: string
    }[]
  }
  garden: {
    nodes: {
      slug: string
    }[]
  }
}

const gardenTemplate = require.resolve(`./src/templates/garden.tsx`)

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
          slug
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
      path: garden.slug,
      component: gardenTemplate,
      context: {
        slug: garden.slug,
      },
    })
  })
}
