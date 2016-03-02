'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (message, dest, sendingStatus, channels) {
  return (0, _mercury.h)('div', {
    style: {
      position: 'fixed',
      bottom: '50px',
      width: '100%',
      height: 'calc(100% - 50px)',
      background: 'white',
      zIndex: 1000
    }
  }, [(0, _mercury.h)('input', { type: 'text', name: 'input', value: dest, placeholder: 'To...', 'ev-input': _mercury2.default.sendValue(channels.changeDest) }), (0, _mercury.h)('textarea', { name: 'input', placeholder: 'Message', 'ev-input': _mercury2.default.sendValue(channels.changeMessage) }, message), sendingStatus || (0, _mercury.h)('div', { style: styles.button, 'ev-click': _mercury2.default.send(channels.sendMessage) }, 'Send')]);
};

var _mercury = require('mercury');

var _mercury2 = _interopRequireDefault(_mercury);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
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
};