'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (groups, contacts, didFetchedContacts, selectedGroup, channels) {
  function createContactEl(contact) {
    var raw = contact.raw.replace(/<div class="c-button[\S\s]+<\/span>/m, '<div>');

    return (0, _mercury.h)('div', { innerHTML: raw });
  }

  function createGroupEl(group) {
    return (0, _mercury.h)('div', { 'ev-click': _mercury2.default.send(channels.selectGroup, group.id) }, group.name);
  }

  var contactArray = !selectedGroup || !groups.find(function (g) {
    return g.id === selectedGroup;
  }) ? [] : groups.find(function (g) {
    return g.id === selectedGroup;
  }).contacts.map(function (c) {
    return contacts[c];
  });

  return (0, _mercury.h)('div', {
    style: {
      position: 'fixed',
      bottom: '50px',
      width: '100%',
      height: 'calc(100% - 50px)',
      background: 'white',
      zIndex: 1000
    }
  }, didFetchedContacts ? [(0, _mercury.h)('div', { style: styles.header }, 'groups'), (0, _mercury.h)('div', { style: styles.header }, 'contact in the selected group'), (0, _mercury.h)('div', { style: styles.list }, groups.map(createGroupEl)), (0, _mercury.h)('div', { style: styles.list }, contactArray.map(createContactEl))] : 'loading...');
};

var _mercury = require('mercury');

var _mercury2 = _interopRequireDefault(_mercury);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
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
};