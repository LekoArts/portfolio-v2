import * as React from "react"
import { Container, Grid, Text, Link as ExternalLink } from "@chakra-ui/react"
import { space } from "../../constants/space"
import { SkipNavContent } from "../a11y/skip-nav"
import { Layout } from "../blocks/layout"
import { Card } from "./card"
import { WritingSubNavigation } from "./subnavigation"

type CategoryViewProps = {
  posts: {
    nodes: {
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
    }[]
  }
}

export const CategoryView: React.FC<CategoryViewProps> = ({ posts, children }) => (
  <Layout subnavigation={<WritingSubNavigation />}>
    <SkipNavContent>
      {children}
      <Container py={space.paddingMedium}>
        {posts.nodes.length > 0 ? (
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
        ) : (
          <Text textStyle="prominent">
            Sadly there's no content for this category available yet. Be sure to follow me on{` `}
            <ExternalLink href="https://twitter.com/lekoarts_de">Twitter</ExternalLink> to not miss any announcements
            about new posts :)
          </Text>
        )}
      </Container>
    </SkipNavContent>
  </Layout>
)
