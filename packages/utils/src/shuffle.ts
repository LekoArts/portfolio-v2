const random = (seed: number): number => {
  let s = seed
  const x = Math.sin(s++) * 10000
  return x - Math.floor(x)
}

/**
 * Use the Fisher–Yates algorithm to shuffle an array. The count stops the shuffle so that not the whole array needs to be iterated through.
 * @param array - Input array
 * @param seed - Used for seeding the result
 * @param count - Number of items to take out of the array
 * @returns A seeded shuffled array
 */
export const shuffle = <T>(array: Array<T>, seed: number, count = 2): Array<T> => {
  let s = seed
  const m = array.length
  const maxToShuffle = Math.min(m - 1, count)

  for (let i = 0; i < maxToShuffle; i++) {
    const toSwap = i + Math.floor(random(s) * (m - i))
    ;[array[i], array[toSwap]] = [array[toSwap], array[i]]
    s++
  }

  return array.slice(0, count)
}
