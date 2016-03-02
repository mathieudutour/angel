import hg, {h} from 'mercury'

const styles = {
  header: {
    overflowY: 'hidden',
    height: '50px',
    width: '50%',
    float: 'left',
    textAlign: 'center'
  },
  list: {
    boxSizing: 'border-box',
    overflowY: 'auto',
    height: 'calc(100% - 80px)',
    width: '50%',
    float: 'left',
    paddingLeft: '10px',
    borderRight: '1px solid black'
  },
  button: {
    height: '30px',
    width: '100%',
    background: 'green',
    clear: 'both'
  }
}

export default function (groups, contacts, didFetchedContacts, selectedGroup, channels) {
  function createContactEl (contact) {
    const raw = contact.raw.replace(/<div class="c-button[\S\s]+<\/span>/m, '<div>')

    return h('div', {innerHTML: raw})
  }

  function createGroupEl (group) {
    return h('div', {'ev-click': hg.send(channels.selectGroup, group.id)}, group.name)
  }

  const contactArray = !selectedGroup || !groups.find((g) => g.id === selectedGroup) ? []
    : groups.find((g) => g.id === selectedGroup).contacts.map((c) => contacts[c])

  return h('div', {
    style: {
      position: 'fixed',
      bottom: '50px',
      width: '100%',
      height: 'calc(100% - 50px)',
      background: 'white',
      zIndex: 1000
    }
  }, didFetchedContacts ? [
    h('div', {style: styles.header}, 'groups'),
    h('div', {style: styles.header}, 'contact in the selected group'),
    h('div', {style: styles.list}, groups.map(createGroupEl)),
    h('div', {style: styles.list}, contactArray.map(createContactEl))
  ] : 'loading...')
}
