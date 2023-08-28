import * as React from "react"
import { Box, IBoxProps } from "./box"
import { SVGIcon, SVGIconNames } from "./svg-icon"
import { tagIconStyle, tagLabelBaseStyle, TagsColorSchemes, tagVariants } from "./tag.css"

interface ITagProps extends IBoxProps {
  iconId?: SVGIconNames
  iconPosition?: "left" | "right"
  colorScheme?: TagsColorSchemes
}

export const Tag: React.FC<React.PropsWithChildren<ITagProps>> = ({
  iconId = undefined,
  iconPosition = `left`,
  colorScheme = `gray`,
  children,
  ...rest
}) => (
  <Box as="span" className={tagVariants[colorScheme]} {...rest}>
    {iconPosition === `left` && iconId && <SVGIcon id={iconId} className={tagIconStyle} />}
    {iconId ? (
      <Box as="span" className={tagLabelBaseStyle}>
        {children}
      </Box>
    ) : (
      children
    )}
    {iconPosition === `right` && iconId && <SVGIcon id={iconId} className={tagIconStyle} />}
  </Box>
)
