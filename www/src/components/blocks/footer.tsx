import * as React from "react"
import FullWidthContainer from "./full-width-container"
import useSiteMetadata from "../../hooks/use-site-metadata"

const Footer: React.FC = () => {
  const { footerNavigation } = useSiteMetadata()

  return (
    <FullWidthContainer variant="dark">
      <footer>test123</footer>
    </FullWidthContainer>
  )
}

export default Footer
