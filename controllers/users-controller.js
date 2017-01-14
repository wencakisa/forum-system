const encryption = require('../utils/encryption')

let User = require('../models/User')

function logInUser (req, res, user) {
  req
    .logIn(user, (err, user) => {
      if (err) {
        user.globalError = err
        res.render('users/register', user)
        return
      }

      res.redirect('/')
    })
}

module.exports = {
  registerPage: (req, res) => {
    res.render('users/register')
  },
  register: (req, res) => {
    let user = req.body

    if (user.password === '') {
      user.globalError = 'Password is required.'
      res.render('users/register', user)
      return
    }
    if (user.password !== user.confirmPassword) {
      user.globalError = 'Passwords do not match.'
      res.render('users/register', user)
      return
    }

    user.salt = encryption.generateSalt()
    user.hashedPass = encryption.generateHashedPassword(user.salt, user.password)

    User
      .create(user)
      .then(user => {
        logInUser(req, res, user)
      })
      .catch(err => {
        console.log(err)
        res.render('users/register', {
          globalError: err
        })
      })
  },
  loginPage: (req, res) => {
    res.render('users/login')
  },
  login: (req, res) => {
    let inputUser = req.body

    User
      .findOne({ username: inputUser.username })
      .then(user => {
        if (!user || !user.authenticate(inputUser.password)) {
          res.render('users/login', { globalError: 'Invalid username or password' })
          return
        }

        logInUser(req, res, user)
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },
  profile: (req, res) => {
    let username = req.params.username

    User
      .findOne({ username: username })
      .then(user => {
        res.render('users/profile', user)
      })
  }
}
