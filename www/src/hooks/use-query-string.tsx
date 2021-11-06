import * as React from "react"
import { navigate } from "gatsby"
import { WindowLocation } from "@reach/router"

export interface Isomorphism<State, QueryString> {
  from: (v: QueryString) => State
  to: (t: State) => QueryString
}

export function useQueryString<State>(opts: {
  initialState: State
  iso: Isomorphism<State, string>
  location: WindowLocation
}): [State, (v: State) => void] {
  const { initialState, iso, location } = opts

  const [desiredState, setDesiredState] = React.useState(() =>
    location.search ? iso.from(location.search.slice(1)) : initialState
  )

  React.useEffect(() => {
    const handler = setTimeout(() => {
      // @ts-ignore - Tags exists there
      if (desiredState.tags.length === 0) {
        navigate(`${location.pathname}`, { replace: true })
      } else {
        navigate(`${location.pathname}?${iso.to(desiredState)}`, { replace: true })
      }
    }, 10)

    return () => clearTimeout(handler)
  }, [desiredState, iso, location.pathname])

  return [desiredState, setDesiredState]
}
