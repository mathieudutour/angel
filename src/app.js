import hg, {h} from 'mercury'
import getContacts from './getContacts'
import {loadGroups} from './preserveGroups'
import {toggleShow, addGroup, toggleSelectContact, sendMessage, changeInput, selectGroup, toggleSelectAllContact} from './reducers'

import bottomBar from './views/bottom-bar'
import contacts from './views/contacts'
import message from './views/message'
import groups from './views/groups'

function App () {
  function parseContact (x) {
    return hg.struct({
      id: hg.value(x.id),
      raw: hg.value(x.raw),
      status: hg.value(x.status)
    })
  }

  function parseGroup (x) {
    return hg.struct({
      id: hg.value(x.id),
      contacts: hg.array(x.contact, hg.value),
      name: hg.value(x.name)
    })
  }

  const state = hg.state({
    contacts: hg.varhash({}, parseContact),
    selectedContacts: hg.varhash({}, hg.value),
    groups: hg.array(loadGroups(), parseGroup),
    didFetchedContacts: hg.value(false),
    message: hg.value(''),
    dest: hg.value(''),
    selectedGroup: hg.value(null),
    sendingStatus: hg.value(''),
    ui: hg.struct({
      showContacts: hg.value(false),
      showGroups: hg.value(false),
      showMessage: hg.value(false)
    }),
    channels: {
      toggleShowContacts: toggleShow.bind(null, 'showContacts'),
      toggleShowGroups: toggleShow.bind(null, 'showGroups'),
      toggleShowMessage: toggleShow.bind(null, 'showMessage'),
      addGroup,
      toggleSelectContact,
      sendMessage,
      changeDest: changeInput.bind(null, 'dest'),
      changeMessage: changeInput.bind(null, 'message'),
      selectGroup,
      toggleSelectAllContact
    }
  })

  getContacts().then((contacts) => {
    state.contacts.set(contacts)
    state.didFetchedContacts.set(true)
  })

  return state
}

App.render = function render (state) {
  const rendering = [
    hg.partial(bottomBar, state.channels)
  ]

  if (state.ui.showContacts) {
    rendering.unshift(
      hg.partial(contacts, state.contacts, state.didFetchedContacts, state.selectedContacts, state.channels)
    )
  }

  if (state.ui.showMessage) {
    rendering.unshift(
      hg.partial(message, state.message, state.dest, state.sendingStatus, state.channels)
    )
  }

  if (state.ui.showGroups) {
    rendering.unshift(
      hg.partial(groups, state.groups, state.contacts, state.didFetchedContacts, state.selectedGroup, state.channels)
    )
  }

  return h('div', rendering)
}

hg.app(document.body, App(), App.render)
