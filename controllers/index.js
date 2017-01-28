let homeController = require('./home-controller')
let postsController = require('./posts-controller')
let usersController = require('./users-controller')
let categoriesController = require('./categories-controller')
let errorController = require('./error-controller')

module.exports = {
  home: homeController,
  posts: postsController,
  users: usersController,
  categories: categoriesController,
  error: errorController
}
