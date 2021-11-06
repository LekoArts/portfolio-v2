import * as React from "react"
import { WindowLocation } from "@reach/router"
import { useQueryString, Isomorphism } from "./use-query-string"

export function useQueryStringReducer<State, Action>(opts: {
  reducer: React.Reducer<State, Action>
  initialState: State
  iso: Isomorphism<State, string>
  location: WindowLocation
}): [State, React.Dispatch<Action>] {
  const { reducer, initialState, iso, location } = opts

  const [state, setState] = useQueryString<State>({
    initialState,
    iso,
    location,
  })

  const dispatch = React.useCallback((action: Action) => setState(reducer(state, action)), [reducer, state, setState])

  return [state, dispatch]
}
