import { parse, stringify } from "query-string"

const arrayFormat = `comma`

export const queryStringIso = {
  from: (locationSearch: string) => {
    let result
    const parsed = parse(locationSearch, { arrayFormat })

    // Only set `result` if there are tags in the query string
    if (parsed.tags) {
      // If only one tag is selected a string is returned, not an array
      if (typeof parsed.tags === `string`) {
        result = {
          tags: [parsed.tags],
        }
      } else {
        result = parsed
      }
    }
    return result
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  to: (queryString: Record<string, any>) => stringify(queryString, { arrayFormat, skipNull: true }),
}
