import * as React from "react"
import { Heading, Text } from "../typography"
import { Box, Container } from "../primitives"
import { contentWrapperStyle, descriptionStyle } from "./category-hero.css"
import { paddingResponsiveArrays } from "../../styles/tokens/space"

type CategoryHeroProps = {
  bgGradient: string
  title: string
  description: React.ReactNode
  image?: React.ReactNode
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({ bgGradient, title, description, image = undefined }) => (
  <Box mt="-navigationWithSubHeight" pt="navigationWithSubHeight" style={{ backgroundImage: bgGradient }}>
    <Container py={paddingResponsiveArrays.paddingSmall}>
      <div className={contentWrapperStyle}>
        <Box display="flex" flexDirection="column">
          <Heading as="h1" __color="white">
            {title}
          </Heading>
          <Text variant="prominent" className={descriptionStyle}>
            {description}
          </Text>
        </Box>
        {image}
      </div>
    </Container>
  </Box>
)
