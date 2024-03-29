import * as React from "react"
import { navigate } from "gatsby"
import { WindowLocation } from "@reach/router"
import { ITagState } from "../components/blocks/tag-group"

export interface IIsomorphism<State, QueryString> {
  from: (v: QueryString) => State
  to: (t: State) => QueryString
}

export function useQueryString<State extends ITagState>(opts: {
  initialState: State
  iso: IIsomorphism<State, string>
  location: WindowLocation
}): [State, (v: State) => void] {
  const { initialState, iso, location } = opts

  const [desiredState, setDesiredState] = React.useState(() => {
    const parsed = iso.from(location.search.slice(1))

    if (parsed) {
      return parsed
    }

    return initialState
  })

  React.useEffect(() => {
    const handler = setTimeout(() => {
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
