module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.status(401).redirect('/login')
    }
  },
  isInRole: (role) => {
    return (req, res, next) => {
      if (req.user && req.user.roles.indexOf(role) > -1) {
        next()
      } else {
        res.render('users/login', { globalError: 'You should be an admin.' })
      }
    }
  }
}
