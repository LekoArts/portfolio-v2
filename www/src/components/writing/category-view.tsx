import * as React from "react"
import { Container, Grid, Text } from "@chakra-ui/react"
import { space } from "../../constants/space"
import { SkipNavContent } from "../a11y/skip-nav"
import { Layout } from "../blocks/layout"
import { Card } from "./card"
import { WritingSubNavigation } from "./subnavigation"
import { ExternalLink } from "../primitives/link"
import { contentGridStyle } from "./category-view.css"

type CategoryViewProps = {
  posts: {
    nodes: Array<{
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
    }>
  }
}

export const CategoryView: React.FC<React.PropsWithChildren<CategoryViewProps>> = ({ posts, children }) => (
  <Layout subnavigation={<WritingSubNavigation />}>
    <SkipNavContent>
      {children}
      <Container py={space.paddingMedium}>
        {posts.nodes.length > 0 ? (
          <div className={contentGridStyle}>
            {posts.nodes.map((post) => (
              <Card
                key={post.slug}
                slug={post.slug}
                title={post.title}
                subtitle={post.subtitle}
                description={post.description}
              />
            ))}
          </div>
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
