import { vi } from "vitest"
import { get, memoize } from "../get"

const obj = { a: 1, b: 2, c: { d: 3, e: { f: 4 } } }

describe(`get`, () => {
  it(`should get value of specified path in object`, () => {
    expect(get(obj, `b`)).toStrictEqual(2)
    expect(get(obj, `c.d`)).toStrictEqual(3)
    expect(get(obj, `c.e.f`)).toStrictEqual(4)
  })
})

describe(`memoize`, () => {
  it(`should get memoized value on successive calls`, () => {
    const mockGet = vi.fn(() => true)
    const memoizedMockGet = memoize(mockGet)

    // run the memoized get twice
    expect(memoizedMockGet(obj, `path`)).toStrictEqual(true)
    expect(memoizedMockGet(obj, `path`)).toStrictEqual(true)
    // make sure get was only called once
    expect(mockGet).toHaveBeenCalledTimes(1)
  })
})
