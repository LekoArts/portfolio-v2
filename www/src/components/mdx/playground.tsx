import * as React from "react"
import {
  SandpackProvider,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackThemeProvider,
  useSandpackNavigation,
  useSandpack,
  UnstyledOpenInCodeSandboxButton,
} from "@codesandbox/sandpack-react"
import type { SandpackPredefinedTemplate, SandpackProviderProps } from "@codesandbox/sandpack-react"
import { nightOwl } from "../../styles/sandpack/nightOwl"
import { Box, IconButton, SVGIcon } from "../primitives"
import {
  spCodeEditor,
  spTabButton,
  header,
  rootWrapper,
  spPreviewContainer,
  previewWrapper,
  middleWrapper,
  refreshButton,
  whiteText,
  backwardButton,
  exportButton,
} from "./playground.css"

interface IPlaygroundProps {
  files: Record<string, string>
  template?: SandpackPredefinedTemplate
  title: string
}

const providerOptions: SandpackProviderProps["options"] = {
  classes: {
    "sp-code-editor": spCodeEditor,
    "sp-tab-button": spTabButton,
    "sp-preview-container": spPreviewContainer,
  },
}

export const PlaygroundContents = ({ title }: Pick<IPlaygroundProps, "title">) => {
  const [refreshRotation, setRefreshRotation] = React.useState(0)
  const { refresh } = useSandpackNavigation()
  const { sandpack } = useSandpack()

  return (
    <Box borderRadius="lg" className={rootWrapper}>
      <Box
        as="header"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        fontSize="sm"
        px="4"
        py="2"
        className={header}
      >
        <div>{title}</div>
        <Box display="flex" alignItems="center" gap="4">
          <IconButton
            onPress={() => sandpack.resetAllFiles()}
            title="Reset code"
            description="Reset all code to its initial state"
            className={backwardButton}
          >
            <SVGIcon height="1.25rem" width="1.25rem" id="backward" />
          </IconButton>
          <UnstyledOpenInCodeSandboxButton className={exportButton}>
            <SVGIcon height="1.25rem" width="1.25rem" id="export" />
          </UnstyledOpenInCodeSandboxButton>
        </Box>
      </Box>
      <SandpackCodeEditor showLineNumbers={false} showTabs closableTabs={false} />
      <Box
        px="4"
        py="2"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        className={middleWrapper}
      >
        <div className={whiteText}>Result</div>
        <Box display="flex" alignItems="center">
          <IconButton
            onPress={() => {
              refresh()
              setRefreshRotation(refreshRotation + 360)
            }}
            title="Refresh pane"
            description="Refresh results pane"
            className={refreshButton}
            style={{ transform: `rotate(${refreshRotation}deg)` }}
          >
            <SVGIcon id="refresh" height="1.25rem" width="1.25rem" />
          </IconButton>
        </Box>
      </Box>
      <Box p="4" height="full" className={previewWrapper}>
        <SandpackPreview showNavigator={false} showOpenInCodeSandbox={false} showRefreshButton={false} />
      </Box>
    </Box>
  )
}

export const Playground = ({ files, template = `react`, title }: IPlaygroundProps) => (
  <SandpackProvider template={template} files={files} options={providerOptions}>
    <SandpackThemeProvider theme={nightOwl}>
      <PlaygroundContents title={title} />
    </SandpackThemeProvider>
  </SandpackProvider>
)
