import { parse, stringify } from "query-string"

const arrayFormat = `comma`

export const queryStringIso = {
  from: (locationSearch: string) => parse(locationSearch, { arrayFormat }),
  to: (queryString: unknown) => stringify(queryString, { arrayFormat, skipNull: true }),
}
