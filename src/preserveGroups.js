const key = '__hack_groups'

export function saveGroups (state) {
  try {
    window.localStorage[key] = JSON.stringify(state.groups())
  } catch (e) {
    console.log(e)
  }
}

export function loadGroups () {
  try {
    return JSON.parse(window.localStorage[key])
  } catch (e) {
    console.log(e)
    return []
  }
}
