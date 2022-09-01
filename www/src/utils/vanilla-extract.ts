import mergeWith from "lodash.mergewith"

const isObject = (value: unknown) => !!(value && typeof value === `object` && !Array.isArray(value))

const isString = (value: unknown) => typeof value === `string`

interface IThemeAwareStylesProps {
  selectorMap: Record<string, unknown>
  defaultTheme: string
  darkThemeClass: string
  rootClass?: string
}

export const themeAwareStyles = ({
  selectorMap,
  defaultTheme,
  darkThemeClass,
  rootClass = ``,
}: IThemeAwareStylesProps) => {
  const selectors: Record<string, Record<string, string>> = {}
  const r = rootClass ? `${rootClass} ` : ``

  Object.entries(selectorMap).forEach(([selector, selectorStyle]) => {
    Object.entries(selectorStyle).forEach(([property, cssOrObject]) => {
      if (isObject(cssOrObject)) {
        selectors[`${r}${selector}`] = {
          ...selectors[`${r}${selector}`],
          [property]: cssOrObject[defaultTheme],
        }
        selectors[`html.${darkThemeClass} ${r}${selector}`] = {
          ...selectors[`html.${darkThemeClass} ${r}${selector}`],
          [property]: cssOrObject.dark,
        }
      } else if (isString(cssOrObject)) {
        selectors[`${r}${selector}`] = {
          ...selectors[`${r}${selector}`],
          [property]: cssOrObject,
        }
      }
    })
  })

  return selectors
}

const removeEmpty = (obj: Record<string, string>) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null))

const customizer = (objValue: Array<Record<string, string>> | undefined, srcValue: Record<string, string | null>) => {
  const srcKeys = Object.keys(srcValue)
  const srcKeysLength = srcKeys.length

  // If srcValue only has one key and it's 'null', return 'null'
  // This way the resulting array will be [{ key: 'value' }, null, { key: 'value' }]
  if (srcKeysLength === 1 && srcValue[srcKeys[0]] === null) {
    return (objValue || []).concat(null)
  }

  // removeEmpty will remove all keys with 'null' values
  return (objValue || []).concat(removeEmpty(srcValue))
}

export const responsiveStyles = (responsiveVariantArray: Array<Record<string, Record<string, string>>>) => {
  const styles: Record<string, Array<Record<string, string> | null>> = {}
  mergeWith(styles, ...responsiveVariantArray, customizer)
  return styles
}
