let homeController = require('./home-controller')
let postsController = require('./posts-controller')
let usersController = require('./users-controller')
let errorController = require('./error-controller')

module.exports = {
  home: homeController,
  posts: postsController,
  users: usersController,
  error: errorController
}
