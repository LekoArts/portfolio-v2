import { responsiveStyles, themeAwareStyles } from "../vanilla-extract"

const defaultTheme = `light`
const darkThemeClass = `dark`

describe(`themeAwareStyles`, () => {
  it(`returns empty object when selectorMap is empty`, () => {
    expect(themeAwareStyles({ selectorMap: {}, defaultTheme, alternateThemeClass: darkThemeClass })).toEqual({})
  })
  it(`supports string as property value`, () => {
    expect(
      themeAwareStyles({
        selectorMap: { "&.active": { background: `red` } },
        defaultTheme,
        alternateThemeClass: darkThemeClass,
      })
    ).toEqual({
      "&.active": { background: `red` },
    })
  })
  it(`supports light/dark child object as property value`, () => {
    expect(
      themeAwareStyles({
        selectorMap: { "&.active": { background: { light: `red`, dark: `blue` } } },
        defaultTheme,
        alternateThemeClass: darkThemeClass,
      })
    ).toEqual({
      "&.active": { background: `red` },
      "html.dark &.active": { background: `blue` },
    })
  })
  it(`combines properties under same selector`, () => {
    expect(
      themeAwareStyles({
        selectorMap: { "&.active": { background: { light: `red`, dark: `blue` }, color: `white` } },
        defaultTheme,
        alternateThemeClass: darkThemeClass,
      })
    ).toEqual({
      "&.active": { background: `red`, color: `white` },
      "html.dark &.active": { background: `blue` },
    })
  })
  it(`combines properties under same selector with light/dark`, () => {
    expect(
      themeAwareStyles({
        selectorMap: {
          "&.active": { background: { light: `red`, dark: `blue` }, color: { light: `white`, dark: `black` } },
        },
        defaultTheme,
        alternateThemeClass: darkThemeClass,
      })
    ).toEqual({
      "&.active": { background: `red`, color: `white` },
      "html.dark &.active": { background: `blue`, color: `black` },
    })
  })
  it(`supports root class`, () => {
    expect(
      themeAwareStyles({
        selectorMap: { "&.active": { background: { light: `red`, dark: `blue` } } },
        defaultTheme,
        alternateThemeClass: darkThemeClass,
        rootClass: `root`,
      })
    ).toEqual({
      "root &.active": { background: `red` },
      "html.dark root &.active": { background: `blue` },
    })
  })
})

describe(`responsiveStyles`, () => {
  it(`collects same property with responsive array`, () => {
    const result = responsiveStyles([
      {
        p: {
          fontSize: `1rem`,
        },
      },
      {
        p: {
          fontSize: `2rem`,
        },
      },
    ])

    expect(result).toEqual({
      p: [{ fontSize: `1rem` }, { fontSize: `2rem` }],
    })
  })
  it(`collects different properties at same variant`, () => {
    const result = responsiveStyles([
      {
        p: {
          fontSize: `1rem`,
        },
        a: {
          fontSize: `1rem`,
        },
      },
    ])

    expect(result).toEqual({
      p: [{ fontSize: `1rem` }],
      a: [{ fontSize: `1rem` }],
    })
  })
  it(`supports 'null' as value to signal a skip`, () => {
    const result = responsiveStyles([
      {
        p: {
          fontSize: `1rem`,
          fontWeight: null as unknown as string,
        },
        a: {
          fontSize: `1rem`,
        },
      },
      {
        p: {
          fontSize: null as unknown as string,
          fontWeight: `normal`,
        },
        a: {
          fontSize: null as unknown as string,
        },
      },
      {
        p: {
          fontSize: `2rem`,
          fontWeight: `bold`,
        },
        a: {
          fontSize: `2rem`,
        },
      },
    ])

    expect(result).toEqual({
      a: [{ fontSize: `1rem` }, null, { fontSize: `2rem` }],
      p: [{ fontSize: `1rem` }, { fontWeight: `normal` }, { fontSize: `2rem`, fontWeight: `bold` }],
    })
  })
})
