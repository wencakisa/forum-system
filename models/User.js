const mongoose = require('mongoose')
const encryption = require('../utils/encryption')
const validationMessages = require('../utils/validation-messages')

let userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: validationMessages.requiredValidationMessage,
    minlength: [3, validationMessages.minLengthValidationMessage],
    maxlength: [20, validationMessages.maxLengthValidationMessage]
  },
  firstName: {
    type: String,
    required: validationMessages.requiredValidationMessage,
    maxlength: [20, validationMessages.maxLengthValidationMessage]
  },
  lastName: {
    type: String,
    required: validationMessages.requiredValidationMessage,
    maxlength: [20, validationMessages.maxLengthValidationMessage]
  },
  salt: String,
  hashedPass: String
})

userSchema.method({
  authenticate: function (password) {
    return (encryption.generateHashedPassword(this.salt, password) === this.hashedPass)
  }
})

module.exports = mongoose.model('User', userSchema)
