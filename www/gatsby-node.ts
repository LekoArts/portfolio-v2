import { GatsbyNode } from "gatsby"
import path from "path"

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
      slug: string
    }[]
  }
  writing: {
    nodes: {
      id: string
      slug: string
      type: "prose" | "tutorial"
    }[]
  }
}

const gardenTemplate = path.resolve(`src/templates/garden.tsx`)
const proseTemplate = path.resolve(`src/templates/prose.tsx`)
const tutorialTemplate = path.resolve(`src/templates/tutorial.tsx`)

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
        }
      }
      writing: allPost(filter: { published: { eq: true } }) {
        nodes {
          id
          slug
          type
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

  garden.nodes.forEach((post) => {
    createPage({
      path: post.slug,
      component: gardenTemplate,
      context: {
        id: post.id,
      },
    })
  })

  writing.nodes.forEach((article) => {
    const component = article.type === `tutorial` ? tutorialTemplate : proseTemplate

    createPage({
      path: article.slug,
      component,
      context: {
        id: article.id,
      },
    })
  })
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`#graphql
    type FlickrPhotosetsList implements Node {
      content: [FlickrPhotosetsPhotos] @link(by: "photoset_id", from: "_id")
    }
  `)
}
