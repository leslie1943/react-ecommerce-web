interface Search {
  [propName: string]: string
}

/**
 *
 * @param search location search
 */
export const convertSearchToObject = (search: string) => {
  const searchArray = search.substring(1, search.length - 1).split('&')
  const searchObject: Search = {}
  searchArray.forEach((item) => {
    const itemArr = item.split('=')
    const key = itemArr[0]
    const value = itemArr[1]
    searchObject[key] = value
  })
  return searchObject
}
