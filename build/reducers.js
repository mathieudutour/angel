'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleShow = toggleShow;
exports.addGroup = addGroup;
exports.toggleSelectContact = toggleSelectContact;
exports.sendMessage = sendMessage;
exports.changeInput = changeInput;
exports.selectGroup = selectGroup;
exports.toggleSelectAllContact = toggleSelectAllContact;

var _utils = require('./utils');

var _preserveGroups = require('./preserveGroups');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function toggleShow(part, state) {
  var nextState = !state.ui[part]();
  state.ui.showContacts.set(false);
  state.ui.showGroups.set(false);
  state.ui.showMessage.set(false);
  state.ui[part].set(nextState);
}

function addGroup(state) {
  var name = window.prompt('Name of the group');
  if (name) {
    state.groups.push({
      id: Date.now(),
      contacts: Object.keys(state.selectedContacts()).filter(function (id) {
        return state.selectedContacts[id]();
      }),
      name: name
    });
    state.ui.showContacts.set(false);
    state.ui.showGroups.set(true);
    (0, _preserveGroups.saveGroups)(state());
  }
}

function toggleSelectContact(state, id) {
  if (!state.selectedContacts[id]) {
    state.selectedContacts.put(id, true);
    return;
  }
  state.selectedContacts[id].set(!state.selectedContacts[id]());
}

function sendMessage(state) {
  var destGroups = state.dest().split(',').map(function (s) {
    return state.groups().find(function (group) {
      return group.name === s.trim();
    });
  }).filter(function (group) {
    return group;
  });
  var message = state.message();

  var dests = {};
  destGroups.forEach(function (group) {
    group.contacts.forEach(function (contact) {
      dests[contact] = true;
    });
  });

  dests = Object.keys(dests);

  var count = dests.length;
  function countSent() {
    count--;
    if (count === 0) {
      state.sendingStatus.set('✓ All sent');
      setTimeout(function () {
        return state.sendingStatus.set('');
      }, 3000);
    } else {
      state.sendingStatus.set('Sending... (' + (dests.length - count) + ' / ' + dests.length + ')');
    }
  }

  if (window.confirm('Sure you want to spam ' + count + ' people?')) {
    (function () {
      var token = (0, _utils.getUserToken)();
      dests.forEach(function (id) {
        $(document.body).append('<form accept-charset="UTF-8" action="/messages" method="post" id="hack-' + id + '">' + '<input name="utf8" type="hidden" value="✓">' + '<input name="authenticity_token" type="hidden" value="' + token + '">' + '<input name="message[recipient_type]" type="hidden" value="User">' + '<input name="message[recipient_id]" type="hidden" value="' + id + '">' + '<input name="message[startup_id]" type="hidden">' + '<textarea name="message[body]">' + message + '</textarea>' + '<input name="commit" type="submit" value="Send">' + '</form>');

        $('#hack-' + id).submit(function (event) {
          jQuery.post('/messages', $(event.currentTarget).serialize(), countSent);
          event.preventDefault();
        });

        $('#hack-' + id).submit();
      });

      state.sendingStatus.set('Sending... (0 / ' + dests.length + ')');
    })();
  }
}

function changeInput(input, state, e) {
  state[input].set(e.input);
}

function selectGroup(state, id) {
  state.selectedGroup.set(id);
}

function selectContact(state, id, flag) {
  if (!state.selectedContacts[id]) {
    state.selectedContacts.put(id, flag);
    return;
  }
  state.selectedContacts[id].set(flag);
}

function toggleSelectAllContact(state, status) {
  var contacts = state.contacts();
  var array = [];
  Object.keys(contacts).forEach(function (k) {
    try {
      return _defineProperty({}, status, array)[contacts[k].status].push(contacts[k]);
    } catch (e) {}
  });
  if (!array.length) {
    console.log('no contact to select');
    return;
  }
  var flag = state.selectedContacts[array[0].id];
  if (flag) {
    flag = !flag();
  } else {
    flag = true;
  }
  array.forEach(function (contact) {
    selectContact(state, contact.id, flag);
  });
}