const mongoose = require('mongoose')
const validationMessages = require('../utils/validation-messages')

let categorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: [2, validationMessages.minLengthValidationMessage],
    maxlength: [20, validationMessages.maxLengthValidationMessage]
  }
})

module.exports = mongoose.model('Category', categorySchema)
