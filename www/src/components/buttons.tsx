import * as React from "react"
import { Link } from "gatsby"
import { BsArrowRight } from "react-icons/bs"
import { Button, usePrefersReducedMotion } from "@chakra-ui/react"
import { FaTwitter } from "react-icons/fa"

/**
 * Primary buttons for important CTA
 */
const PrimaryButton: React.FC<{ to: string; isExternal?: boolean }> = ({ children, to, isExternal = false }) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <Button
      as={isExternal ? `a` : Link}
      // @ts-ignore
      to={isExternal ? undefined : to}
      href={isExternal ? to : undefined}
      variant="primary"
      rightIcon={<BsArrowRight />}
      sx={{
        span: {
          transform: `translate3d(0px, 0px, 0px)`,
          transition: `transform .3s cubic-bezier(.73,.26,.42,1.24)`,
        },
        "&:hover": {
          span: {
            transform: prefersReducedMotion ? undefined : `translate3d(6px, 0px, 0px)`,
          },
        },
        svg: {
          height: `1.5em`,
          width: `1.5em`,
        },
      }}
    >
      {children}
    </Button>
  )
}

/**
 * Secondary button
 */
const SubtleButton: React.FC<{ to: string; isExternal?: boolean }> = ({ children, to, isExternal = false }) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <Button
      as={isExternal ? `a` : Link}
      // @ts-ignore
      to={isExternal ? undefined : to}
      href={isExternal ? to : undefined}
      colorScheme="gray"
      variant="link"
      textTransform="uppercase"
      letterSpacing="wider"
      fontSize="sm"
      fontWeight="medium"
      rightIcon={<BsArrowRight />}
      sx={{
        span: {
          transform: `translate3d(0px, 0px, 0px)`,
          transition: `transform .3s cubic-bezier(.73,.26,.42,1.24)`,
        },
        "&:hover": {
          span: {
            transform: prefersReducedMotion ? undefined : `translate3d(6px, 0px, 0px)`,
          },
        },
        svg: {
          height: `1.5em`,
          width: `1.5em`,
        },
      }}
    >
      {children}
    </Button>
  )
}

const getTwitterShareLink = (link, message) =>
  `https://twitter.com/intent/tweet/?text=${encodeURIComponent(message)}&via=lekoarts_de&url=${encodeURIComponent(
    link
  )}`

const TwitterButton = ({ link, message }) => (
  <Button
    as="a"
    href={getTwitterShareLink(link, message)}
    target="_blank"
    rel="noreferrer noopener"
    size="md"
    variant="primary"
    rightIcon={<FaTwitter />}
  >
    Share on Twitter
  </Button>
)

export { PrimaryButton, SubtleButton, TwitterButton }
