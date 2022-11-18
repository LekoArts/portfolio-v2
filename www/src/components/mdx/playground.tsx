import * as React from "react"
import { SandpackProvider, SandpackPreview, SandpackCodeEditor, Sandpack } from "@codesandbox/sandpack-react"
import { nightOwl } from "@codesandbox/sandpack-themes"

const code1 = `export default function App() {
  return <h1>Hello Sandpack</h1>
}`
const code2 = `export default function App2() {
  return <h1>Hello World</h1>
}`

export const Playground = () => (
  <Sandpack template="react" theme={nightOwl} files={{ "/App.js": code1, "/App2.js": code2 }} />
)

/*
export const Playground = () => (
  <SandpackProvider template="react" theme={nightOwl} files={{ "/App.js": code1, "/App2.js": code2 }}>
    <div style={{ border: `solid hotpink` }}>
      <SandpackCodeEditor showLineNumbers={false} />
      <SandpackPreview />
    </div>
  </SandpackProvider>
)
*/
