import {getUserToken} from './utils'
import {saveGroups} from './preserveGroups'

export function toggleShow (part, state) {
  const nextState = !state.ui[part]()
  state.ui.showContacts.set(false)
  state.ui.showGroups.set(false)
  state.ui.showMessage.set(false)
  state.ui[part].set(nextState)
}

export function addGroup (state) {
  const name = window.prompt('Name of the group')
  if (name) {
    state.groups.push({
      id: Date.now(),
      contacts: Object.keys(state.selectedContacts()).filter((id) => state.selectedContacts[id]()),
      name
    })
    state.ui.showContacts.set(false)
    state.ui.showGroups.set(true)
    saveGroups(state())
  }
}

export function toggleSelectContact (state, id) {
  if (!state.selectedContacts[id]) {
    state.selectedContacts.put(id, true)
    return
  }
  state.selectedContacts[id].set(!state.selectedContacts[id]())
}

export function sendMessage (state) {
  const destGroups = state.dest().split(',').map((s) => state.groups().find((group) => group.name === s.trim())).filter((group) => group)
  const message = state.message()

  let dests = {}
  destGroups.forEach((group) => {
    group.contacts.forEach((contact) => {
      dests[contact] = true
    })
  })

  dests = Object.keys(dests)

  let count = dests.length
  function countSent () {
    count--
    if (count === 0) {
      state.sendingStatus.set('✓ All sent')
      setTimeout(() => state.sendingStatus.set(''), 3000)
    } else {
      state.sendingStatus.set(`Sending... (${dests.length - count} / ${dests.length})`)
    }
  }

  if (window.confirm(`Sure you want to spam ${count} people?`)) {
    const token = getUserToken()
    dests.forEach((id) => {
      $(document.body).append(
        '<form accept-charset="UTF-8" action="/messages" method="post" id="hack-' + id + '">' +
          '<input name="utf8" type="hidden" value="✓">' +
          '<input name="authenticity_token" type="hidden" value="' + token + '">' +
          '<input name="message[recipient_type]" type="hidden" value="User">' +
          '<input name="message[recipient_id]" type="hidden" value="' + id + '">' +
          '<input name="message[startup_id]" type="hidden">' +
          '<textarea name="message[body]">' + message + '</textarea>' +
          '<input name="commit" type="submit" value="Send">' +
        '</form>'
      )

      $('#hack-' + id).submit((event) => {
        jQuery.post('/messages', $(event.currentTarget).serialize(), countSent)
        event.preventDefault()
      })

      $('#hack-' + id).submit()
    })

    state.sendingStatus.set(`Sending... (0 / ${dests.length})`)
  }
}

export function changeInput (input, state, e) {
  state[input].set(e.input)
}

export function selectGroup (state, id) {
  state.selectedGroup.set(id)
}

function selectContact (state, id, flag) {
  if (!state.selectedContacts[id]) {
    state.selectedContacts.put(id, flag)
    return
  }
  state.selectedContacts[id].set(flag)
}

export function toggleSelectAllContact (state, status) {
  const contacts = state.contacts()
  const array = []
  Object.keys(contacts).forEach((k) => {
    try {
      return {
        [status]: array
      }[contacts[k].status].push(contacts[k])
    } catch (e) {}
  })
  if (!array.length) {
    console.log('no contact to select')
    return
  }
  let flag = state.selectedContacts[array[0].id]
  if (flag) {
    flag = !flag()
  } else {
    flag = true
  }
  array.forEach((contact) => {
    selectContact(state, contact.id, flag)
  })
}
