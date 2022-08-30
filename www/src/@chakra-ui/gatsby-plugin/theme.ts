import { extendTheme } from "@chakra-ui/react"

// Foundational style overrides
import { colors } from "./foundations/colors"
import { fontWeights, fonts, fontSizes, lineHeights, textStyles } from "./foundations/typography"
import { sizes } from "./foundations/sizes"
import { semanticTokens } from "./foundations/semantic-tokens"

// Components overrides & custom
import { Container } from "./components/container"
import { FullWidthContainer } from "./components/full-width-container"
import { Heading } from "./components/heading"
import { Prose } from "./components/prose"
import { Text } from "./components/text"

// Custom breakpoints
const breakpoints = {
  sm: `640px`,
  md: `768px`,
  lg: `1024px`,
  xl: `1280px`,
  "2xl": `1536px`,
}

const theme = extendTheme({
  styles: {},
  colors,
  sizes,
  space: sizes,
  fontWeights,
  fonts,
  fontSizes,
  lineHeights,
  textStyles,
  semanticTokens,
  components: {
    Container,
    FullWidthContainer,
    Heading,
    Prose,
    Text,
  },
  breakpoints,
  config: {
    initialColorMode: `system`,
    useSystemColorMode: true,
  },
})

export default theme
