import * as React from "react"
import { Link } from "gatsby"
import { BsArrowRight } from "react-icons/bs"
import { Button } from "@chakra-ui/react"

const PrimaryButton: React.FC<{ to: string; isExternal?: boolean }> = ({ children, to, isExternal = false }) => {
  if (isExternal) {
    return (
      <Button
        as="a"
        href={to}
        colorScheme="blue"
        rightIcon={<BsArrowRight />}
        sx={{
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

  return (
    <Button
      as={Link}
      to={to}
      colorScheme="blue"
      rightIcon={<BsArrowRight />}
      sx={{
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

const SubtleButton: React.FC<{ to: string; isExternal?: boolean }> = ({ children, to, isExternal = false }) => {
  if (isExternal) {
    return (
      <Button
        as="a"
        href={to}
        colorScheme="gray"
        variant="link"
        textTransform="uppercase"
        letterSpacing="wider"
        fontSize="sm"
        fontWeight="medium"
        rightIcon={<BsArrowRight />}
        sx={{
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

  return (
    <Button
      as={Link}
      to={to}
      colorScheme="gray"
      variant="link"
      textTransform="uppercase"
      letterSpacing="wider"
      fontSize="sm"
      fontWeight="medium"
      rightIcon={<BsArrowRight />}
      sx={{
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

export { PrimaryButton, SubtleButton }
