import * as React from "react"

function getValue<T>(key: string, fallback: T): T {
  if (typeof window === `undefined`) return fallback

  let value

  try {
    const saved = localStorage.getItem(key)

    if (saved) value = JSON.parse(saved)
  } catch (e) {
    // Do nothing
  }

  return value ?? fallback
}

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>

export function useLocalStorage<T>(storageKey: string, fallback: T): [T, SetValue<T>] {
  const [value, setValue] = React.useState<T>(() => getValue<T>(storageKey, fallback))

  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value))
  }, [value, storageKey])

  return [value, setValue]
}
