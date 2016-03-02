import hg, {h} from 'mercury'

const styles = {
  header: {
    overflowY: 'hidden',
    height: '50px',
    width: '30%',
    float: 'left',
    textAlign: 'center'
  },
  list: {
    boxSizing: 'border-box',
    overflowY: 'auto',
    height: 'calc(100% - 80px)',
    width: '30%',
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

export default function (message, dest, sendingStatus, channels) {
  return h('div', {
    style: {
      position: 'fixed',
      bottom: '50px',
      width: '100%',
      height: 'calc(100% - 50px)',
      background: 'white',
      zIndex: 1000
    }
  }, [
    h('input', {type: 'text', name: 'input', value: dest, placeholder: 'To...', 'ev-input': hg.sendValue(channels.changeDest)}),
    h('textarea', {name: 'input', placeholder: 'Message', 'ev-input': hg.sendValue(channels.changeMessage)}, message),
    sendingStatus || h('div', {style: styles.button, 'ev-click': hg.send(channels.sendMessage)}, 'Send')
  ])
}
