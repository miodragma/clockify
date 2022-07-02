export const filterByAscAndDesc = (data, order) => {
  return data.sort((a, b) => {
    if (order === 'DESCENDING') {
      return a.name > b.name ? -1 : 1
    }
    return a.name < b.name ? -1 : 1
  })
}
