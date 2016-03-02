'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserURL = getUserURL;
exports.getUserToken = getUserToken;
exports.fetch = fetch;
function getUserURL() {
  return $('.navLinksColumn.personal a')[0].href;
}

function getUserToken() {
  return $('meta[name="csrf-token"]')[0].content;
}

function fetch() {
  var _$;

  return (_$ = $).get.apply(_$, arguments);
}