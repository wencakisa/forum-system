const Router = require('express').Router
const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app
    .get('/', controllers.home.index)
    .get('/register', controllers.users.registerPage)
    .post('/register', controllers.users.register)
    .get('/login', controllers.users.loginPage)
    .post('/login', controllers.users.login)
    .post('/logout', controllers.users.logout)
    .get('/profile/:username', auth.isAuthenticated, controllers.users.profile)
    .get('/profile/:username/edit', auth.isAuthenticated, controllers.users.editProfileForm)
    .post('/profile/:username/edit', auth.isAuthenticated, controllers.users.editProfile)

  let postsRouter = Router()

  postsRouter
    .get('/', controllers.posts.list)
    .get('/add', auth.isAuthenticated, controllers.posts.addForm)
    .post('/add', auth.isAuthenticated, controllers.posts.add)
    .get('/:id', auth.isAuthenticated, controllers.posts.detail)
    .post('/:id/like', auth.isAuthenticated, controllers.posts.like)
    .post('/:id/dislike', auth.isAuthenticated, controllers.posts.dislike)
    .get('/:id/edit', auth.isInRole('Admin'), controllers.posts.editForm)
    .post('/:id/edit', auth.isInRole('Admin'), controllers.posts.edit)
    .post('/:id/delete', auth.isInRole('Admin'), controllers.posts.delete)

  app.use('/posts', postsRouter)

  app.all('*', controllers.error.notFound)
}
