import { shadows } from "./shadows"

export const transforms = {
  beforeHover: {
    transform: `translate3d(0, 0, 0)`,
    transition: `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
  },
  onHover: {
    transform: `translate3d(0, -8px, 0)`,
    boxShadow: shadows.xl,
  },
}

export const transition = {
  property: {
    common: `background-color, border-color, color, fill, stroke, opacity, box-shadow, transform`,
    colors: `background-color, border-color, color, fill, stroke`,
    dimensions: `width, height`,
    position: `left, right, top, bottom`,
    background: `background-color, background-image, background-position`,
  },
  easing: {
    "ease-in": `cubic-bezier(0.4, 0, 1, 1)`,
    "ease-out": `cubic-bezier(0, 0, 0.2, 1)`,
    "ease-in-out": `cubic-bezier(0.4, 0, 0.2, 1)`,
  },
  duration: {
    "ultra-fast": `50ms`,
    faster: `100ms`,
    fast: `150ms`,
    normal: `200ms`,
    slow: `300ms`,
    slower: `400ms`,
    "ultra-slow": `500ms`,
  },
}
