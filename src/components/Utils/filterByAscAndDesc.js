export const filterByAscAndDesc = (data, order, property) => {
  return data.sort((a, b) => {
    if (order === 'DESCENDING') {
      return a[property] > b[property] ? -1 : 1
    }
    return a[property] < b[property] ? -1 : 1
  })
}
