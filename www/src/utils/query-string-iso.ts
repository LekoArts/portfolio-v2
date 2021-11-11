import { parse, stringify } from "query-string"

const arrayFormat = `comma`

export const queryStringIso = {
  from: (locationSearch: string) => {
    let result
    const parsed = parse(locationSearch, { arrayFormat })
    // If only one tag is selected a string is returned, not an array
    if (typeof parsed.tags === `string`) {
      result = {
        tags: [parsed.tags],
      }
    } else {
      result = parsed
    }
    return result
  },
  to: (queryString: unknown) => stringify(queryString, { arrayFormat, skipNull: true }),
}
