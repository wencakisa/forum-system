let Category = require('../models/Category')

module.exports = {
  list: (req, res) => {
    Category
      .find({})
      .then(categories => {
        res.render('categories/list', { result: categories })
      })
  },
  addForm: (req, res) => {
    res.render('categories/add')
  },
  add: (req, res) => {
    let body = req.body

    Category
      .create(body)
      .then(category => {
        res.redirect('/categories')
      })
      .catch(err => {
        res.render('categories/add', { globalError: err })
        return
      })
  },
  delete: (req, res) => {
    let id = req.params.id

    Category
      .findByIdAndRemove(id)
      .then(post => {
        res.redirect('/categories')
      })
  }
}
