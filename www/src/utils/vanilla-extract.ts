const isObject = (value) => !!(value && typeof value === `object` && !Array.isArray(value))

const isString = (value) => typeof value === `string`

export const responsiveSelectorStyles = (selectorMap, defaultTheme, darkThemeClass) => {
  const selectors = {}

  Object.entries(selectorMap).forEach(([selector, selectorStyle]) => {
    Object.entries(selectorStyle).forEach(([property, cssOrObject]) => {
      if (isObject(cssOrObject)) {
        selectors[selector] = {
          ...selectors[selector],
          [property]: cssOrObject[defaultTheme],
        }
        selectors[`html${darkThemeClass} ${selector}`] = {
          [property]: cssOrObject.dark,
        }
      } else if (isString(cssOrObject)) {
        selectors[selector] = {
          ...selectors[selector],
          [property]: cssOrObject,
        }
      }
    })
  })

  return selectors
}
