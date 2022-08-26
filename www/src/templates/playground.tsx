import { Container } from "@chakra-ui/react"
import { useButton } from "@react-aria/button"
import type { HeadFC } from "gatsby"
import * as React from "react"
import { FaMoon as Moon } from "react-icons/fa"
import { MdWbSunny as Sun } from "react-icons/md"
import { useTheme, TogglePrimitive } from "themes-utils"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Layout } from "../components/blocks/layout"
import { Box } from "../components/primitives/box"
import { SEO } from "../components/seo"

const Button = (props) => {
  const ref = React.useRef()
  const { buttonProps } = useButton(props, ref)
  const { children } = props

  return <button {...buttonProps}>{children}</button>
}

const Toggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const isLight = resolvedTheme === `light`

  const toggleColorMode = React.useCallback(() => {
    setTheme(isLight ? `dark` : `light`)
  }, [isLight, setTheme])

  return (
    <TogglePrimitive>
      <Button aria-label={isLight ? `Activate Dark Mode` : `Activate Light Mode`} onPress={toggleColorMode}>
        {isLight ? <Moon /> : <Sun fontSize="1.25rem" />}
      </Button>
    </TogglePrimitive>
  )
}

// This is a file to try out things in my site
const Playground = () => {
  const data = useTheme()

  return (
    <Layout>
      <SkipNavContent>
        <Container variant="proseRoot">
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
          <Toggle />
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Playground

export const Head: HeadFC = () => <SEO title="Playground" />
