import * as React from "react"
import { graphql } from "gatsby"
import { useReducedMotion } from "framer-motion"
import { Text, useColorModeValue } from "@chakra-ui/react"
import { cardVariants, prefersReducedMotion } from "../../styles/motion"
import MotionBox from "../blocks/motion-box"
import Link from "../link"

type CardProps = {
  slug: string
  title: string
  subtitle?: string
  description: string
}

const Card: React.FC<CardProps> = ({ slug, title, subtitle, description }) => {
  const shouldReduceMotion = useReducedMotion()
  const cardBg = useColorModeValue(`white`, `blueGray.800`)
  const headingColor = useColorModeValue(`black`, `white`)
  const headingHoverColor = useColorModeValue(`brand.primary`, `brand.dark.primary`)
  const subheadingColor = useColorModeValue(`blueGray.900`, `blueGray.400`)

  return (
    <MotionBox
      variants={shouldReduceMotion ? prefersReducedMotion.cardVariants : cardVariants}
      initial="beforeHover"
      whileHover="onHover"
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      bg={cardBg}
      key={slug}
      _focusWithin={{ boxShadow: `outline` }}
    >
      <Link
        to={slug}
        _focus={{ boxShadow: `none`, h2: { color: headingHoverColor } }}
        _hover={{ textDecoration: `none`, h2: { color: headingHoverColor } }}
      >
        <Text as="h2" fontSize="21px" fontWeight="bold" color={headingColor} transition="color 0.3s ease-in-out">
          {title}
        </Text>
        {subtitle && (
          <Text as="h3" fontSize="18px" fontWeight="medium" color={subheadingColor}>
            {subtitle}
          </Text>
        )}
        <Text mt={6}>{description}</Text>
      </Link>
    </MotionBox>
  )
}

export default Card

export const query = graphql`
  fragment CardPostInformation on Post {
    title
    date
    slug
    subtitle
    description
  }
`
