const auth = require('../config/auth')

module.exports = (express, controllers) => {
  let postsRouter = express.Router()

  postsRouter
    .get('/:id', auth.isAuthenticated, controllers.posts.detail)
    .post('/:id/like', auth.isAuthenticated, controllers.posts.like)
    .post('/:id/dislike', auth.isAuthenticated, controllers.posts.dislike)
    .get('/:id/edit', auth.isInRole('Admin'), controllers.posts.editForm)
    .post('/:id/edit', auth.isInRole('Admin'), controllers.posts.edit)
    .post('/:id/delete', auth.isInRole('Admin'), controllers.posts.delete)

  return postsRouter
}
