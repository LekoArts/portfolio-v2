import * as React from "react"
import { Container, Grid } from "@chakra-ui/react"
import Layout from "../blocks/layout"
import { SkipNavContent } from "../a11y/skip-nav"
import WritingSubNavigation from "./subnavigation"
import Card from "./card"
import space from "../../styles/space"

type CategoryViewProps = {
  posts: {
    nodes: {
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
    }[]
    totalCount: number
  }
}

const CategoryView: React.FC<CategoryViewProps> = ({ posts, children }) => (
  <Layout subnavigation={<WritingSubNavigation />}>
    <SkipNavContent>
      {children}
      <Container pt="20" pb={space.paddingMedium}>
        <Grid gridTemplateColumns={[`1fr`, null, `repeat(2, 1fr)`]} gap={8} mx={[`0`, null, null, `-6`]}>
          {posts.nodes.map((post) => (
            <Card
              key={post.slug}
              slug={post.slug}
              title={post.title}
              subtitle={post.subtitle}
              description={post.description}
            />
          ))}
        </Grid>
      </Container>
    </SkipNavContent>
  </Layout>
)

export default CategoryView
