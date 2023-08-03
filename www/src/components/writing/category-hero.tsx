import * as React from "react"
import { Heading, Text } from "../typography"
import { Box, Container } from "../primitives"
import { contentWrapperStyle, descriptionStyle, imageWrapperStyle } from "./category-hero.css"
import { Atoms } from "../../styles/atoms.css"

const pt = [`12`, `2`, null, null, null] as Atoms["paddingTop"]
const pb = [`12`, null, `14`, `16`, null] as Atoms["paddingTop"]

type CategoryHeroProps = {
  bgGradient: string
  title: string
  description: React.ReactNode
  image?: React.ReactNode
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({ bgGradient, title, description, image = undefined }) => (
  <Box
    marginTop="-navigationWithSubHeight"
    paddingTop="navigationWithSubHeight"
    style={{ backgroundImage: bgGradient }}
  >
    <Container paddingBottom={pb} paddingTop={pt}>
      <div className={contentWrapperStyle}>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Heading as="h1" __color="white">
            {title}
          </Heading>
          <Text variant="prominent" className={descriptionStyle}>
            {description}
          </Text>
        </Box>
        <div className={imageWrapperStyle}>{image}</div>
      </div>
    </Container>
  </Box>
)
