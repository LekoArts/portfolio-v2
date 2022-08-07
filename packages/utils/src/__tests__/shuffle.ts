import { shuffle } from "../shuffle"

describe(`shuffle`, () => {
  it(`seed makes it consistent`, () => {
    expect(shuffle([`one`, `two`, `three`], 1)).toStrictEqual([`three`, `one`])
  })
  it(`count option`, () => {
    expect(shuffle([`one`, `two`, `three`, `four`, `five`], 1, 3)).toStrictEqual([`four`, `five`, `three`])
  })
})
