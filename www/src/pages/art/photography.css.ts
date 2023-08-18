import { StyleRule, style, styleVariants } from "@vanilla-extract/css"
import { vars } from "../../styles/themes/contract.css"
import { pseudoSelectors } from "../../styles/selectors"
import { minMediaQuery } from "../../styles/tokens/breakpoints"

export const layoutIconStyle = style({
  color: vars.color.textMuted,
  transition: `all 0.3s ease-in-out`,
  selectors: {
    [pseudoSelectors.hover]: {
      color: vars.color.heading,
    },
    [`&.active`]: {
      background: vars.color.ghostBg,
      color: vars.color.heading,
    },
  },
})

export const explanationLayoutWrapperStyle = style({
  display: `flex`,
  justifyContent: `space-between`,
  flexDirection: `column-reverse`,
  gap: vars.space[2],
  "@media": {
    [minMediaQuery(`sm`)]: {
      flexDirection: `row`,
      alignItems: `center`,
    },
  },
})

export type ImageWrapperVariants = "grid" | "masonry" | "list"

const imageWrapper: Record<ImageWrapperVariants, StyleRule> = {
  list: {
    width: vars.space.full,
    marginLeft: vars.space.auto,
    marginRight: vars.space.auto,
    maxWidth: `1024px`,
    paddingLeft: vars.space[4],
    paddingRight: vars.space[4],
    "@media": {
      [minMediaQuery(`sm`)]: {
        paddingLeft: vars.space[6],
        paddingRight: vars.space[6],
      },
    },
  },
  grid: {
    display: `grid`,
    gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
    "@media": {
      [minMediaQuery(`lg`)]: {
        gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
      },
      [minMediaQuery(`xl`)]: {
        gridTemplateColumns: `repeat(auto-fit, minmax(400px, 1fr))`,
      },
    },
  },
  masonry: {
    columns: `2`,
    gap: vars.space[4],
    paddingLeft: vars.space[4],
    paddingRight: vars.space[4],
    "@media": {
      [minMediaQuery(`sm`)]: {
        columns: `3`,
        gap: vars.space[6],
        paddingLeft: vars.space[6],
        paddingRight: vars.space[6],
      },
      [minMediaQuery(`lg`)]: {
        columns: `4`,
      },
      [minMediaQuery(`xl`)]: {
        columns: `5`,
      },
    },
  },
}

export const imageWrapperVariants = styleVariants(imageWrapper, (variant) => [variant])

const gridImages: Record<ImageWrapperVariants, StyleRule> = {
  list: {
    borderRadius: vars.borderRadius.lg,
    marginTop: vars.space[8],
    marginBottom: vars.space[8],
    "@media": {
      [minMediaQuery(`sm`)]: {
        marginTop: vars.space[10],
        marginBottom: vars.space[10],
      },
    },
  },
  grid: {
    aspectRatio: `1 !important`,
    objectFit: `cover`,
    maxHeight: `100% !important`,
  },
  masonry: {
    width: `100%`,
    height: `auto`,
    marginBottom: vars.space[4],
    borderRadius: vars.borderRadius.lg,
    "@media": {
      [minMediaQuery(`sm`)]: {
        marginBottom: vars.space[6],
      },
    },
  },
}

export const gridImagesVariants = styleVariants(gridImages, (variant) => [variant])
