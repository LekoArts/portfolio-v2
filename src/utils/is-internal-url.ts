import { site } from "../constants/meta.mjs"

const base = new URL(site.url)

export function isInternalUrl(url: string): boolean {
  return new URL(url, base).hostname === base.hostname
}
