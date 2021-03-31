import * as React from "react"
import { Box, Container, Flex, Text, Grid } from "@chakra-ui/react"
import { BackgroundProps } from "@chakra-ui/system"
import { space } from "../../constants/space"
import { Heading } from "../typography/heading"

type CategoryHeroProps = {
  bgGradient: BackgroundProps["bgGradient"]
  title: string
  description: React.ReactNode
  image?: React.ReactNode
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({ bgGradient, title, description, image = undefined }) => (
  <Box mt="-navigationWithSubHeight" bgGradient={bgGradient} pt="navigationWithSubHeight">
    <Container py={space.paddingSmall}>
      <Grid templateColumns="auto" gap={12}>
        <Flex direction="column">
          <Heading as="h1" color="white">
            {title}
          </Heading>
          <Text textStyle="prominent" color="gray.100" maxWidth="65ch">
            {description}
          </Text>
        </Flex>
        {image}
      </Grid>
    </Container>
  </Box>
)
