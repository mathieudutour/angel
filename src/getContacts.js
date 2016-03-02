import {getUserURL, fetch} from './utils'

function getFollowAtPage (page, followers) {
  return new Promise((resolve, reject) => {
    fetch(getUserURL() + (followers ? '/followers' : '/following') + '?page=' + page, (res) => {
      if (!res || !res.rendered_items) {
        return reject()
      }
      resolve(res.rendered_items.map((item) => {
        return {
          raw: item,
          id: /data-id="(\w+)"/.exec(item)[1]
        }
      }))
    })
  })
}

function getAllFollows (followers) {
  return new Promise((resolve, reject) => {
    let follows = []
    let page = 1
    function done () {
      resolve(follows)
    }

    function recursiveGetAtPage () {
      getFollowAtPage(page, followers).then((res) => {
        if (res.length) {
          follows = follows.concat(res)
          ++page
          return recursiveGetAtPage()
        }
        done()
      }).catch(() => reject())
    }

    recursiveGetAtPage()
  })
}

export default function () {
  return Promise.all([getAllFollows(false), getAllFollows(true)]).then(([followings, followers]) => {
    const contacts = followings.reduce((combine, following) => {
      combine[following.id] = {
        ...following,
        status: 'following'
      }
      return combine
    }, {})

    followers.forEach((follower) => {
      if (contacts[follower.id]) {
        contacts[follower.id].status = 'mutual'
      } else {
        contacts[follower.id] = {
          ...follower,
          status: 'follower'
        }
      }
    })

    return contacts
  })
}
