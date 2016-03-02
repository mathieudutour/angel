import hg, {h} from 'mercury'

const styles = {
  header: {
    overflowY: 'hidden',
    height: '50px',
    width: '33.3%',
    float: 'left',
    textAlign: 'center'
  },
  list: {
    boxSizing: 'border-box',
    overflowY: 'auto',
    height: 'calc(100% - 80px)',
    width: '33.3%',
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

export default function (contacts, didFetchedContacts, selectedContacts, channels) {
  function createContactEl (contact) {
    const selected = selectedContacts[contact.id]

    const raw = contact.raw.replace(/<div class="c-button[\S\s]+<\/span>/m, !selected ? '<div>select' : '<div>✓')

    return h('div', {
      'ev-click': hg.send(channels.toggleSelectContact, contact.id),
      innerHTML: raw
    })
  }

  const mutualArray = []
  const followingArray = []
  const followerArray = []
  Object.keys(contacts).forEach((k) => {
    return {
      mutual: mutualArray,
      following: followingArray,
      follower: followerArray
    }[contacts[k].status].push(contacts[k])
  })

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
    h('div', {style: styles.header, 'ev-click': hg.send(channels.toggleSelectAllContact, 'mutual')}, 'Mutual'),
    h('div', {style: styles.header, 'ev-click': hg.send(channels.toggleSelectAllContact, 'following')}, 'Following'),
    h('div', {style: styles.header, 'ev-click': hg.send(channels.toggleSelectAllContact, 'follower')}, 'follower'),
    h('div', {style: styles.list}, mutualArray.map(createContactEl)),
    h('div', {style: styles.list}, followingArray.map(createContactEl)),
    h('div', {style: styles.list}, followerArray.map(createContactEl)),
    h('div', {style: styles.button, 'ev-click': hg.send(channels.addGroup)}, 'Create group')
  ] : 'loading...')
}
