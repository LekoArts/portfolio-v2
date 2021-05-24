/* eslint-disable */
import * as React from "react"

declare module "react" {
  interface HTMLAttributes<T> {
    value?: string
  }
}

declare global {
  interface Window {
    plausible: (name: string, options: { callback?: () => void; props?: { [key: string]: string } }) => void
  }
}
