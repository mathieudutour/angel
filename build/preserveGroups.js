'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveGroups = saveGroups;
exports.loadGroups = loadGroups;
var key = '__hack_groups';

function saveGroups(state) {
  try {
    window.localStorage[key] = JSON.stringify(state.groups());
  } catch (e) {
    console.log(e);
  }
}

function loadGroups() {
  try {
    return JSON.parse(window.localStorage[key]);
  } catch (e) {
    console.log(e);
    return [];
  }
}