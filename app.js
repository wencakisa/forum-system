const express = require('express')

let app = express()

const env = process.env.NODE_ENV || 'development'
const config = require('./config/config')[env]

require('./config/database')(config)
require('./config/express')(app)
require('./routers')(app, express)
require('./config/passport')()

app.listen(config.port, () => console.log(`App listening on port ${config.port}`))
