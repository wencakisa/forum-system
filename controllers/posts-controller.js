let Post = require('../models/Post')
let Category = require('../models/Category')

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
    Category
      .find({})
      .then(categories => {
        res.render('posts/add', { categories: categories })
      })
  },
  add: (req, res) => {
    let body = req.body
    console.log(body)

    Post
      .create(body)
      .then(post => {
        res.redirect('/posts')
      })
      .catch(err => {
        res.render('posts/add', { globalError: err })
        return
      })
  },
  detail: (req, res) => {
    let id = req.params.id

    Post
      .findByIdAndUpdate(id, { $inc: { views: 1 } })
      .then(post => {
        res.render('posts/detail', { result: post })
      })
      .catch(err => {
        console.log(err)
        res.render('404-error')
        return
      })
  },
  like: (req, res) => {
    let id = req.params.id

    Post
      .findByIdAndUpdate(id, { $inc: { likes: 1 } })
      .then(post => {
        res.redirect(`/posts/${id}`)
      })
  },
  dislike: (req, res) => {
    let id = req.params.id

    Post
      .findByIdAndUpdate(id, { $dec: { likes: 1 } })
      .then(post => {
        res.redirect(`/posts/${id}`)
      })
  },
  editForm: (req, res) => {
    let id = req.params.id

    Post
      .findById(id)
      .then(post => {
        res.render('posts/edit', { result: post })
      })
  },
  edit: (req, res) => {
    let id = req.params.id
    let body = req.body

    Post
      .findByIdAndUpdate(id, body)
      .then(post => {
        res.redirect(`/posts/${id}`)
      })
  },
  delete: (req, res) => {
    let id = req.params.id

    Post
      .findByIdAndRemove(id)
      .then(post => {
        res.redirect('/posts')
      })
  }
}
