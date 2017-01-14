const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const morgan = require('morgan')

module.exports = (app) => {
  app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
  app.set('view engine', 'handlebars')

  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({
    secret: 'neshtosupertainobate#@*$!',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use('/static', express.static('./public'))
  app.use(morgan('combined'))
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }

    next()
  })
}
