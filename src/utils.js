export function getUserURL () {
  return $('.navLinksColumn.personal a')[0].href
}

export function getUserToken () {
  return $('meta[name="csrf-token"]')[0].content
}

export function fetch (...args) {
  return $.get(...args)
}
