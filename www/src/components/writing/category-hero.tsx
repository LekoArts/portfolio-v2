import * as React from "react"
import { Container, Text, Grid } from "@chakra-ui/react"
import { space } from "../../constants/space"
import { Heading } from "../typography/heading"
import { Box } from "../primitives/box"

type CategoryHeroProps = {
  bgGradient: string
  title: string
  description: React.ReactNode
  image?: React.ReactNode
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({ bgGradient, title, description, image = undefined }) => (
  <Box mt="-navigationWithSubHeight" pt="navigationWithSubHeight" style={{ backgroundImage: bgGradient }}>
    <Container py={space.paddingSmall}>
      <Grid templateColumns="auto" gap={12}>
        <Box display="flex" flexDirection="column">
          <Heading as="h1" color="white">
            {title}
          </Heading>
          <Text textStyle="prominent" color="gray.100" maxWidth="65ch">
            {description}
          </Text>
        </Box>
        {image}
      </Grid>
    </Container>
  </Box>
)
