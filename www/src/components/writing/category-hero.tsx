import * as React from "react"
import { Container, Text } from "@chakra-ui/react"
import { space } from "../../constants/space"
import { Heading } from "../typography/heading"
import { Box } from "../primitives/box"
import { contentWrapperStyle } from "./category-hero.css"

type CategoryHeroProps = {
  bgGradient: string
  title: string
  description: React.ReactNode
  image?: React.ReactNode
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({ bgGradient, title, description, image = undefined }) => (
  <Box mt="-navigationWithSubHeight" pt="navigationWithSubHeight" style={{ backgroundImage: bgGradient }}>
    <Container py={space.paddingSmall}>
      <div className={contentWrapperStyle}>
        <Box display="flex" flexDirection="column">
          <Heading as="h1" color="white">
            {title}
          </Heading>
          <Text textStyle="prominent" color="gray.100" maxWidth="65ch">
            {description}
          </Text>
        </Box>
        {image}
      </div>
    </Container>
  </Box>
)
