import { withDefaults, defaults } from "../with-defaults"

describe(`withDefaults`, () => {
  it(`returns default values without any parameters`, () => {
    expect(withDefaults({ plugins: [] })).toStrictEqual(defaults)
  })
  it(`returns mix of defaults and custom value with parameters`, () => {
    expect(withDefaults({ plugins: [], writingSource: `expanse` })).toStrictEqual({
      writingSource: `expanse`,
      gardenSource: defaults.gardenSource,
      dataSource: defaults.dataSource,
    })
  })
})
