/* eslint-disable @typescript-eslint/no-explicit-any */
// Copied from https://github.com/TheMightyPenguin/dessert-box
// The MIT License (MIT) - Copyright (c) 2021 Victor Tortolero

/* eslint-disable no-restricted-syntax */

import React, { createElement, forwardRef } from "react"

export function composeClassNames(...classNames: Array<string | undefined>) {
  const classes = classNames
    .filter((className) => Boolean(className) && className !== ` `)
    .map((className) => className?.toString().trim()) as Array<string>
  return classes.length === 0 ? `` : classes.join(` `)
}

export interface IAtomsFnBase {
  (...args: any): string
  properties: Set<string>
}

export function extractAtomsFromProps<AtomsFn extends IAtomsFnBase>(props: any, atomsFn: AtomsFn) {
  let hasAtomProps = false
  const atomProps: Record<string, unknown> = {}
  const otherProps: Record<string, unknown> = {}
  const customProps: Record<string, unknown> = {}

  for (const key in props) {
    if (key[0] === `_` && key[1] === `_`) {
      const actualKey = key.substring(2)
      customProps[actualKey] = props[key]
    } else if (atomsFn.properties.has(key)) {
      hasAtomProps = true
      atomProps[key] = props[key]
    } else {
      otherProps[key] = props[key]
    }
  }

  return { hasAtomProps, atomProps, otherProps, customProps }
}

type HTMLProperties = Omit<React.AllHTMLAttributes<HTMLElement>, "as" | "color" | "height" | "width" | "size" | "type">

type OverrideTokens<T> = {
  [K in keyof T as K extends string ? `__${K}` : number]: any | Record<string, unknown>
}

type CreateBoxParams<AtomsFn> = {
  atoms: AtomsFn
}

export function createBox<AtomsFn extends IAtomsFnBase>({ atoms: atomsFn }: CreateBoxParams<AtomsFn>) {
  type Tokens = Parameters<AtomsFn>[0]
  type BoxProps = {
    as?: React.ElementType
    children?: React.ReactNode
    className?: string
    style?: Record<string, any>
  } & Tokens &
    OverrideTokens<Tokens> &
    HTMLProperties

  const Box = forwardRef<HTMLElement, BoxProps>(
    ({ as: element = `div`, className, style, ...props }: BoxProps, ref) => {
      const { atomProps, customProps, otherProps } = extractAtomsFromProps(props, atomsFn)

      return createElement(element, {
        ref,
        style: { ...style, ...customProps },
        ...otherProps,
        className: composeClassNames(className, atomsFn(atomProps)),
      })
    }
  )

  Box.displayName = `Box`

  return Box
}
