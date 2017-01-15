const express = require('express')

const controllers = require('../controllers')

const defaultRouter = require('./default-router')(express, controllers)
const usersRouter = require('./users-router')(express, controllers)
const postsRouter = require('./posts-router')(express, controllers)

module.exports = (app, express) => {
  app.use('/', defaultRouter, usersRouter)
  app.use('/post', postsRouter)
  app.all('*', controllers.error.notFound)
}
