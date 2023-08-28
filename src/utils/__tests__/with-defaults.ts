import { withDefaults, defaults } from "../with-defaults.mjs"

describe(`withDefaults`, () => {
  it(`returns default values without any parameters`, () => {
    expect(withDefaults({})).toStrictEqual(defaults)
  })
  it(`returns mix of defaults and custom value with parameters`, () => {
    expect(withDefaults({ writingSource: `expanse` })).toStrictEqual({
      writingSource: `expanse`,
      gardenSource: defaults.gardenSource,
      dataSource: defaults.dataSource,
    })
  })
})
