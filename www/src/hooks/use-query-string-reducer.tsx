import * as React from "react"
import { WindowLocation } from "@reach/router"
import { useQueryString, IIsomorphism } from "./use-query-string"
import { ITagState } from "../components/blocks/tag-group"

export function useQueryStringReducer<State extends ITagState, Action>(opts: {
  reducer: React.Reducer<State, Action>
  initialState: State
  iso: IIsomorphism<State, string>
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
