import * as React from "react"
import { graphql } from "gatsby"
import { Text, useColorModeValue } from "@chakra-ui/react"
import { MotionBox } from "../blocks/motion-box"
import { Link } from "../link"

type CardProps = {
  slug: string
  title: string
  subtitle?: string
  description: string
}

export const Card: React.FC<CardProps> = ({ slug, title, subtitle, description }) => {
  const cardBg = useColorModeValue(`brand.cardBg`, `brand.dark.cardBg`)
  const headingColor = useColorModeValue(`black`, `white`)
  const headingHoverColor = useColorModeValue(`brand.primary`, `brand.dark.primary`)
  const subheadingColor = useColorModeValue(`brand.cardSubheading`, `brand.dark.cardSubheading`)

  return (
    <MotionBox p={6} borderRadius="lg" boxShadow="lg" bg={cardBg} key={slug} _focusWithin={{ boxShadow: `outline` }}>
      <Link
        to={slug}
        _focus={{ boxShadow: `none`, h2: { color: headingHoverColor } }}
        _hover={{ textDecoration: `none`, h2: { color: headingHoverColor } }}
      >
        <Text as="h2" fontSize="1.3125rem" fontWeight="bold" color={headingColor} transition="color 0.3s ease-in-out">
          {title}
        </Text>
        {subtitle && (
          <Text as="h3" fontSize="1.125rem" fontWeight="medium" color={subheadingColor}>
            {subtitle}
          </Text>
        )}
        <Text mt={6}>{description}</Text>
      </Link>
    </MotionBox>
  )
}

export const query = graphql`
  fragment CardPostInformation on Post {
    title
    date
    slug
    subtitle
    description
  }
`
