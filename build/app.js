'use strict';

var _mercury = require('mercury');

var _mercury2 = _interopRequireDefault(_mercury);

var _getContacts = require('./getContacts');

var _getContacts2 = _interopRequireDefault(_getContacts);

var _preserveGroups = require('./preserveGroups');

var _reducers = require('./reducers');

var _bottomBar = require('./views/bottom-bar');

var _bottomBar2 = _interopRequireDefault(_bottomBar);

var _contacts = require('./views/contacts');

var _contacts2 = _interopRequireDefault(_contacts);

var _message = require('./views/message');

var _message2 = _interopRequireDefault(_message);

var _groups = require('./views/groups');

var _groups2 = _interopRequireDefault(_groups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
  function parseContact(x) {
    return _mercury2.default.struct({
      id: _mercury2.default.value(x.id),
      raw: _mercury2.default.value(x.raw),
      status: _mercury2.default.value(x.status)
    });
  }

  function parseGroup(x) {
    return _mercury2.default.struct({
      id: _mercury2.default.value(x.id),
      contacts: _mercury2.default.array(x.contact, _mercury2.default.value),
      name: _mercury2.default.value(x.name)
    });
  }

  var state = _mercury2.default.state({
    contacts: _mercury2.default.varhash({}, parseContact),
    selectedContacts: _mercury2.default.varhash({}, _mercury2.default.value),
    groups: _mercury2.default.array((0, _preserveGroups.loadGroups)(), parseGroup),
    didFetchedContacts: _mercury2.default.value(false),
    message: _mercury2.default.value(''),
    dest: _mercury2.default.value(''),
    selectedGroup: _mercury2.default.value(null),
    sendingStatus: _mercury2.default.value(''),
    ui: _mercury2.default.struct({
      showContacts: _mercury2.default.value(false),
      showGroups: _mercury2.default.value(false),
      showMessage: _mercury2.default.value(false)
    }),
    channels: {
      toggleShowContacts: _reducers.toggleShow.bind(null, 'showContacts'),
      toggleShowGroups: _reducers.toggleShow.bind(null, 'showGroups'),
      toggleShowMessage: _reducers.toggleShow.bind(null, 'showMessage'),
      addGroup: _reducers.addGroup,
      toggleSelectContact: _reducers.toggleSelectContact,
      sendMessage: _reducers.sendMessage,
      changeDest: _reducers.changeInput.bind(null, 'dest'),
      changeMessage: _reducers.changeInput.bind(null, 'message'),
      selectGroup: _reducers.selectGroup,
      toggleSelectAllContact: _reducers.toggleSelectAllContact
    }
  });

  (0, _getContacts2.default)().then(function (contacts) {
    state.contacts.set(contacts);
    state.didFetchedContacts.set(true);
  });

  return state;
}

App.render = function render(state) {
  var rendering = [_mercury2.default.partial(_bottomBar2.default, state.channels)];

  if (state.ui.showContacts) {
    rendering.unshift(_mercury2.default.partial(_contacts2.default, state.contacts, state.didFetchedContacts, state.selectedContacts, state.channels));
  }

  if (state.ui.showMessage) {
    rendering.unshift(_mercury2.default.partial(_message2.default, state.message, state.dest, state.sendingStatus, state.channels));
  }

  if (state.ui.showGroups) {
    rendering.unshift(_mercury2.default.partial(_groups2.default, state.groups, state.contacts, state.didFetchedContacts, state.selectedGroup, state.channels));
  }

  return (0, _mercury.h)('div', rendering);
};

_mercury2.default.app(document.body, App(), App.render);