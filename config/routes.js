const controllers = require('../controllers')
const auth = require('../config/auth')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('home')
  })

  app.get('/list', controllers.posts.list)
  app.get('/add', auth.isAuthenticated, controllers.posts.addForm)
  app.post('/add', auth.isAuthenticated, controllers.posts.add)
  app.get('/post/:id', auth.isAuthenticated, controllers.posts.detail)

  app.get('/register', controllers.users.registerPage)
  app.post('/register', controllers.users.register)
  app.get('/login', controllers.users.loginPage)
  app.post('/login', controllers.users.login)
  app.post('/logout', controllers.users.logout)
  app.get('/profile/:username', auth.isAuthenticated, controllers.users.profile)

  app.all('*', (req, res) => {
    res.render('404-error')
  })
}
