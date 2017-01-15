const controllers = require('../controllers')
const auth = require('../config/auth')

module.exports = (express) => {
  let usersRouter = express.Router()

  usersRouter
    .get('/register', controllers.users.registerPage)
    .post('/register', controllers.users.register)
    .get('/login', controllers.users.loginPage)
    .post('/login', controllers.users.login)
    .post('/logout', controllers.users.logout)
    .get('/profile/:username', auth.isAuthenticated, controllers.users.profile)

  return usersRouter
}
