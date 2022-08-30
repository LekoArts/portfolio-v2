import * as React from "react"
import { graphql } from "gatsby"
import { Text } from "@chakra-ui/react"
import { MotionBox, Link } from "../primitives"
import { cardStyle, headingStyle, linkStyle } from "./card.css"

type CardProps = {
  slug: string
  title: string
  subtitle?: string
  description: string
}

export const Card: React.FC<CardProps> = ({ slug, title, subtitle, description }) => (
  <MotionBox p="6" borderRadius="lg" bg="cardBg" className={cardStyle} key={slug}>
    <Link to={slug} className={linkStyle}>
      <Text
        as="h2"
        fontSize="1.3125rem"
        fontWeight="bold"
        color="heading"
        transition="color 0.3s ease-in-out"
        className={headingStyle}
      >
        {title}
      </Text>
      {subtitle && (
        <Text as="h3" fontSize="1.125rem" fontWeight="medium" color="textMuted">
          {subtitle}
        </Text>
      )}
      <Text mt="6">{description}</Text>
    </Link>
  </MotionBox>
)

export const query = graphql`
  fragment CardPostInformation on Post {
    title
    date
    slug
    subtitle
    description
  }
`
