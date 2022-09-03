import * as React from "react"

interface ITogglePrimitiveProps {
  fallback?: React.ReactNode
}

export const TogglePrimitive: React.FC<React.PropsWithChildren<ITogglePrimitiveProps>> = ({
  children,
  fallback = undefined,
}) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    if (!fallback) {
      return null
    }
    return <>{fallback}</>
  }

  return <>{children}</>
}
