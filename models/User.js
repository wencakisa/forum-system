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
  hashedPass: String,
  roles: [String]
})

userSchema.method({
  authenticate: function (password) {
    return (encryption.generateHashedPassword(this.salt, password) === this.hashedPass)
  },
  isAdmin: function () {
    return this.roles.indexOf('Admin') > -1
  }
})

let User = mongoose.model('User', userSchema)

// Seeding an admin
User
  .findOne({ username: 'Admin' })
  .then(user => {
    if (!user) {
      let salt = encryption.generateSalt()
      let hashedPass = encryption.generateHashedPassword(salt, '123456')

      User.create({
        username: 'Admin',
        firstName: 'Admin',
        lastName: 'Adminov',
        salt: salt,
        hashedPass: hashedPass,
        roles: ['Admin']
      })
    }
  })

module.exports = User
