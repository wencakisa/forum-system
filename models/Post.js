const mongoose = require('mongoose')
const validationMessages = require('../utils/validation-messages')

mongoose.Promise = global.Promise

let postSchema = mongoose.Schema({
  title: {
    type: String,
    required: validationMessages.requiredValidationMessage,
    minlength: [3, validationMessages.minLengthValidationMessage],
    maxlength: [50, validationMessages.maxLengthValidationMessage]
  },
  description: {
    type: String,
    required: validationMessages.requiredValidationMessage,
    minlength: [5, validationMessages.minLengthValidationMessage]
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Post', postSchema)
