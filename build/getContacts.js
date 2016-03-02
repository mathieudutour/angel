'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function () {
  return Promise.all([getAllFollows(false), getAllFollows(true)]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var followings = _ref2[0];
    var followers = _ref2[1];

    var contacts = followings.reduce(function (combine, following) {
      combine[following.id] = _extends({}, following, {
        status: 'following'
      });
      return combine;
    }, {});

    followers.forEach(function (follower) {
      if (contacts[follower.id]) {
        contacts[follower.id].status = 'mutual';
      } else {
        contacts[follower.id] = _extends({}, follower, {
          status: 'follower'
        });
      }
    });

    return contacts;
  });
};

var _utils = require('./utils');

function getFollowAtPage(page, followers) {
  return new Promise(function (resolve, reject) {
    (0, _utils.fetch)((0, _utils.getUserURL)() + (followers ? '/followers' : '/following') + '?page=' + page, function (res) {
      if (!res || !res.rendered_items) {
        return reject();
      }
      resolve(res.rendered_items.map(function (item) {
        return {
          raw: item,
          id: /data-id="(\w+)"/.exec(item)[1]
        };
      }));
    });
  });
}

function getAllFollows(followers) {
  return new Promise(function (resolve, reject) {
    var follows = [];
    var page = 1;
    function done() {
      resolve(follows);
    }

    function recursiveGetAtPage() {
      getFollowAtPage(page, followers).then(function (res) {
        if (res.length) {
          follows = follows.concat(res);
          ++page;
          return recursiveGetAtPage();
        }
        done();
      }).catch(function () {
        return reject();
      });
    }

    recursiveGetAtPage();
  });
}