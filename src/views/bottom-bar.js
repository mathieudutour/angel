import hg, {h} from 'mercury'

const styles = {
  button: {
    height: '30px',
    margin: '10px',
    color: 'white'
  }
}

export default function (channels) {
  return h('div', {
    style: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: '50px',
      background: 'black',
      zIndex: 1000
    }
  }, [
    h('button', {style: styles.button, 'ev-click': hg.send(channels.toggleShowGroups)}, 'Groups'),
    h('button', {style: styles.button, 'ev-click': hg.send(channels.toggleShowContacts)}, 'Contacts'),
    h('button', {style: styles.button, 'ev-click': hg.send(channels.toggleShowMessage)}, 'Message')
  ])
}
