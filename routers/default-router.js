const auth = require('../config/auth')

module.exports = (express, controllers) => {
  let defaultRouter = express.Router()

  defaultRouter
    .get('/', controllers.home.index)
    .get('/list', controllers.posts.list)
    .get('/add', auth.isAuthenticated, controllers.posts.addForm)
    .post('/add', auth.isAuthenticated, controllers.posts.add)

  return defaultRouter
}
