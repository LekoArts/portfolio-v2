import * as React from "react"
import {
  SandpackProvider,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackThemeProvider,
} from "@codesandbox/sandpack-react"
import type { SandpackPredefinedTemplate, SandpackProviderProps } from "@codesandbox/sandpack-react"
import { nightOwl } from "../../styles/sandpack/nightOwl"
import { Box } from "../primitives"
import {
  spWrapper,
  spCodeEditor,
  spEditor,
  spTabButton,
  spTabs,
  header,
  rootWrapper,
  spPreviewContainer,
  spPreview,
  spPreviewIframe,
  previewWrapper,
  middleWrapper,
} from "./playground.css"

interface IPlaygroundProps {
  files: Record<string, string>
  template?: SandpackPredefinedTemplate
  title: string
}

const providerOptions: SandpackProviderProps["options"] = {
  classes: {
    "sp-wrapper": spWrapper,
    "sp-code-editor": spCodeEditor,
    "sp-editor": spEditor,
    "sp-tabs": spTabs,
    "sp-tab-button": spTabButton,
    "sp-preview": spPreview,
    "sp-preview-container": spPreviewContainer,
    "sp-preview-iframe": spPreviewIframe,
  },
}

export const Playground = ({ files, template = `react`, title }: IPlaygroundProps) => (
  <SandpackProvider template={template} files={files} options={providerOptions}>
    <SandpackThemeProvider theme={nightOwl}>
      <Box borderRadius="lg" className={rootWrapper}>
        <Box as="header" className={header}>
          <Box>{title}</Box>
        </Box>
        <SandpackCodeEditor showLineNumbers={false} showTabs closableTabs={false} />
        <div className={middleWrapper}>Result</div>
        <div className={previewWrapper}>
          <SandpackPreview showNavigator={false} showOpenInCodeSandbox={false} showRefreshButton={false} />
        </div>
      </Box>
    </SandpackThemeProvider>
  </SandpackProvider>
)
