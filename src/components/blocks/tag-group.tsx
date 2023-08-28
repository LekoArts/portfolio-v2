import * as React from "react"
import { SVGIcon, ToggleButton } from "../primitives"
import { composeClassNames } from "../../utils/box"
import { tagCloseIconStyle, tagGroupStyle, tagStyle } from "./tag-group.css"

export interface ITagState {
  tags: Array<string>
}
export type TagAction = { type: `ADD_TAG`; payload: string } | { type: `REMOVE_TAG`; payload: string }

export const initialState: ITagState = {
  tags: [],
}

export const reducer = (state: ITagState, action: TagAction) => {
  switch (action.type) {
    case `ADD_TAG`:
      return { ...state, tags: state.tags.concat(action.payload) }
    case `REMOVE_TAG`:
      return { ...state, tags: state.tags.filter((tag) => tag !== action.payload) }
    default:
      throw new Error(`Unknown action passed to filter reducer`)
  }
}

export const TagGroup: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className={tagGroupStyle}>{children}</div>
)

interface ITagGroupItemProps {
  name: string
  state: ITagState
  dispatch: React.Dispatch<TagAction>
}

export const TagGroupItem = ({ name, state, dispatch }: ITagGroupItemProps) => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const isActive = state.tags.includes(name) && isMounted

  return (
    <ToggleButton
      key={name}
      isSelected={isActive}
      onChange={() => {
        if (state.tags.includes(name)) {
          dispatch({ type: `REMOVE_TAG`, payload: name })
        } else {
          dispatch({ type: `ADD_TAG`, payload: name })
        }
      }}
      className={composeClassNames(tagStyle, isActive ? `active` : ``)}
    >
      <>
        {name}
        {isActive && (
          <span className={tagCloseIconStyle} aria-hidden>
            <SVGIcon id="close" width="100%" height="100%" />
          </span>
        )}
      </>
    </ToggleButton>
  )
}
