let Post = require('../models/Post')

module.exports = {
  list: (req, res) => {
    Post
      .find({})
      .sort('-postedOn')
      .then(posts => {
        res.render('posts/list', { result: posts })
      })
  },
  addForm: (req, res) => {
    res.render('posts/add')
  },
  add: (req, res) => {
    let body = req.body

    Post
      .create(body)
      .then(post => {
        res.redirect('/list')
      })
      .catch(err => {
        res.render('posts/add', { globalError: err })
        return
      })
  },
  detail: (req, res) => {
    let id = req.params.id

    Post
      .findById(id)
      .then(post => {
        res.render('posts/detail', { result: post })
      })
      .catch(err => {
        console.log(err)
        res.render('404-error')
        return
      })
  }
}
