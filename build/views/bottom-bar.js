'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (channels) {
  return (0, _mercury.h)('div', {
    style: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: '50px',
      background: 'black',
      zIndex: 1000
    }
  }, [(0, _mercury.h)('button', { style: styles.button, 'ev-click': _mercury2.default.send(channels.toggleShowGroups) }, 'Groups'), (0, _mercury.h)('button', { style: styles.button, 'ev-click': _mercury2.default.send(channels.toggleShowContacts) }, 'Contacts'), (0, _mercury.h)('button', { style: styles.button, 'ev-click': _mercury2.default.send(channels.toggleShowMessage) }, 'Message')]);
};

var _mercury = require('mercury');

var _mercury2 = _interopRequireDefault(_mercury);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  button: {
    height: '30px',
    margin: '10px',
    color: 'white'
  }
};