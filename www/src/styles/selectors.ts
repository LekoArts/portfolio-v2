// Adapted from https://github.com/chakra-ui/chakra-ui/
// MIT License - Copyright (c) 2019 Segun Adebayo

export const pseudoSelectors = {
  /**
   * Styles for CSS selector `&:hover`
   */
  hover: `&:hover, &[data-hover]`,
  /**
   * Styles for CSS Selector `&:active`
   */
  active: `&:active, &[data-active]`,
  /**
   * Styles for CSS selector `&:focus`
   *
   */
  focus: `&:focus, &[data-focus]`,
  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  focusWithin: `&:focus-within`,
  /**
   * Styles to apply when this element has received focus via tabbing
   * - CSS Selector `&:focus-visible`
   */
  focusVisible: `&:focus-visible, &[data-focus-visible]`,
  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&[data-disabled]`
   */
  disabled: `&[disabled], &[aria-disabled=true], &[data-disabled]`,
  /**
   * Styles for CSS Selector `&:readonly`
   */
  readOnly: `&[aria-readonly=true], &[readonly], &[data-readonly]`,
  /**
   * Styles for CSS selector `&::before`
   */
  before: `&::before`,
  /**
   * Styles for CSS selector `&::after`
   */
  after: `&::after`,
  /**
   * Styles for CSS selector `&:empty`
   */
  empty: `&:empty`,
  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   *
   * - CSS selector `&[aria-selected=true]`
   */
  selected: `&[aria-selected=true], &[data-selected]`,
  /**
   * Styles for CSS Selector `[hidden=true]`
   */
  hidden: `&[hidden], &[data-hidden]`,
  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  even: `&:nth-of-type(even)`,
  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  odd: `&:nth-of-type(odd)`,
  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  first: `&:first-of-type`,
  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  last: `&:last-of-type`,
  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  notFirst: `&:not(:first-of-type)`,
  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  notLast: `&:not(:last-of-type)`,
  /**
   * Styles for CSS Selector `&:visited`
   */
  visited: `&:visited`,
  /**
   * Styles for CSS Selector `&::placeholder`.
   */
  placeholder: `&::placeholder`,
  /**
   * Styles for CSS Selector `@media (prefers-color-scheme: dark)`
   * It is used when the user has requested the system use a light or dark color theme.
   */
  mediaDark: `@media (prefers-color-scheme: dark)`,
  /**
   * Styles for CSS Selector `@media (prefers-reduced-motion: reduce)`
   * It is used when the user has requested the system to reduce the amount of animations.
   */
  mediaReduceMotion: `@media (prefers-reduced-motion: reduce)`,
}

export type Pseudos = typeof pseudoSelectors

export const pseudoPropNames = Object.keys(pseudoSelectors) as Array<keyof typeof pseudoSelectors>
