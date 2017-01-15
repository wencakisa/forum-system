const passport = require('passport')
const LocalPassport = require('passport-local')
const User = require('../models/User')

module.exports = () => {
  let authStrategy = new LocalPassport(
    (username, password, done) => {
      User
        .findOne({ username: username })
        .then(user => {
          if (!user) return done(null, false)
          if (!user.authenticate(password)) return done(null, false)

          return done(null, user)
        })
        .catch(err => done(err, false))
    }
  )
  passport.use(authStrategy)

  passport.serializeUser((user, done) => {
    if (user) return done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User
      .findById(id)
      .then(user => {
        return done(null, user || false)
      })
  })
}
