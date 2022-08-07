// Adapted from https://github.com/chakra-ui/chakra-ui/blob/ff0dfb2b735a047c7a811f65b20fb81fa3db6f4a/packages/theme-tools/src/color.ts

import { TinyColor } from "@ctrl/tinycolor"
import { memoizedGet as get } from "./get"

type Dict<T = any> = Record<string, T>

/**
 * Get the color raw value from colorPalette
 * @param colorPalette - the colorPalette object
 * @param color - the color path ("green.200")
 * @param fallback - the fallback color
 */
export const getColor = (colorPalette: Dict, color: string, fallback?: string) => {
  const hex = get(colorPalette, color, color)
  const { isValid } = new TinyColor(hex)
  return isValid ? hex : fallback
}

/**
 * Make a color transparent
 * @param color - the color in hex, rgb, or hsl
 * @param opacity - the amount of opacity the color should have (0-1)
 */
export const transparentize = (color: string, opacity: number) => (colorPalette: Dict) => {
  const raw = getColor(colorPalette, color)
  return new TinyColor(raw).setAlpha(opacity).toRgbString()
}
