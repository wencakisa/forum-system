const passport = require('passport')
const LocalPassport = require('passport-local')
const User = require('../models/User')

module.exports = () => {
  let authStrategy = new LocalPassport(
    (username, password, next) => {
      User
        .findOne({ username: username })
        .then(user => {
          if (!user) return next(null, false)
          if (!user.authenticate(password)) return next(null, false)

          return next(null, user)
        })
        .catch(err => next(err, false))
    }
  )
  passport.use(authStrategy)

  passport.serializeUser((user, next) => {
    if (user) return next(null, user._id)
  })

  passport.deserializeUser((id, next) => {
    User
      .findById(id)
      .then(user => {
        return next(null, user || false)
      })
  })
}
