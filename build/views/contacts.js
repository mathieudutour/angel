'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (contacts, didFetchedContacts, selectedContacts, channels) {
  function createContactEl(contact) {
    var selected = selectedContacts[contact.id];

    var raw = contact.raw.replace(/<div class="c-button[\S\s]+<\/span>/m, !selected ? '<div>select' : '<div>✓');

    return (0, _mercury.h)('div', {
      'ev-click': _mercury2.default.send(channels.toggleSelectContact, contact.id),
      innerHTML: raw
    });
  }

  var mutualArray = [];
  var followingArray = [];
  var followerArray = [];
  Object.keys(contacts).forEach(function (k) {
    return {
      mutual: mutualArray,
      following: followingArray,
      follower: followerArray
    }[contacts[k].status].push(contacts[k]);
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
  }, didFetchedContacts ? [(0, _mercury.h)('div', { style: styles.header, 'ev-click': _mercury2.default.send(channels.toggleSelectAllContact, 'mutual') }, 'Mutual'), (0, _mercury.h)('div', { style: styles.header, 'ev-click': _mercury2.default.send(channels.toggleSelectAllContact, 'following') }, 'Following'), (0, _mercury.h)('div', { style: styles.header, 'ev-click': _mercury2.default.send(channels.toggleSelectAllContact, 'follower') }, 'follower'), (0, _mercury.h)('div', { style: styles.list }, mutualArray.map(createContactEl)), (0, _mercury.h)('div', { style: styles.list }, followingArray.map(createContactEl)), (0, _mercury.h)('div', { style: styles.list }, followerArray.map(createContactEl)), (0, _mercury.h)('div', { style: styles.button, 'ev-click': _mercury2.default.send(channels.addGroup) }, 'Create group')] : 'loading...');
};

var _mercury = require('mercury');

var _mercury2 = _interopRequireDefault(_mercury);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
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
};