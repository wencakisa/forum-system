const express = require('express')

let app = express()

const env = process.env.NODE_ENV || 'development'
const config = require('./config/config')[env]

require('./config/database')(config)
require('./config/express')(app)
require('./config/routes')(app)
require('./config/passport')()

app.listen(config.port, () => { console.log(`Magic happening on http://localhost:${config.port}/`) })
