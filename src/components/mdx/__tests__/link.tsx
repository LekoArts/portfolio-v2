/**
 * @vitest-environment jsdom
 */

import * as React from "react"
import { render, screen } from "@testing-library/react"
import { MarkdownLink } from "../link"

describe(`MarkdownLink`, () => {
  it(`should render internal link`, () => {
    render(<MarkdownLink href="/internal">Internal Link</MarkdownLink>)
    const link = screen.getByRole(`link`)
    expect(link).toHaveAttribute(`data-link-internal`)
  })

  it(`should render external link`, () => {
    render(<MarkdownLink href="https://example.com">External Link</MarkdownLink>)
    const link = screen.getByRole(`link`)
    expect(link).toHaveAttribute(`data-link-external`)
    expect(link).toHaveAttribute(`target`, `_blank`)
    expect(link).toHaveAttribute(`rel`, `noopener noreferrer`)
    expect(link).toHaveTextContent(`(opens in a new tab)`)
  })

  it(`should render hash link`, () => {
    render(<MarkdownLink href="#hash">Hash Link</MarkdownLink>)
    const link = screen.getByRole(`link`)
    expect(link).toHaveAttribute(`href`, `#hash`)
    expect(link).not.toHaveAttribute(`data-link-internal`)
    expect(link).not.toHaveAttribute(`data-link-external`)
  })

  it(`should render mailto link`, () => {
    render(<MarkdownLink href="mailto:test@example.com">Mailto Link</MarkdownLink>)
    const link = screen.getByRole(`link`)
    expect(link).toHaveAttribute(`href`, `mailto:test@example.com`)
    expect(link).not.toHaveAttribute(`data-link-internal`)
    expect(link).not.toHaveAttribute(`data-link-external`)
  })
})
