import * as React from "react"

export const useActiveHash = (
  itemIds: Array<string>,
  options: {
    root?: HTMLElement | null
    rootMargin?: string
    thresholds?: ReadonlyArray<number>
  } = {}
) => {
  const [activeHash, setActiveHash] = React.useState(``)

  React.useEffect(() => {
    if (typeof window === `undefined`) {
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%`, ...options }
    )

    const existingElements = itemIds.map((id) => document.getElementById(id)).filter(Boolean)

    existingElements.forEach((el) => {
      if (el) {
        observer.observe(el)
      }
    })

    return () => {
      existingElements.forEach((el) => {
        if (el) {
          observer.unobserve(el)
        }
      })
    }
  }, [itemIds, options])

  return activeHash
}
