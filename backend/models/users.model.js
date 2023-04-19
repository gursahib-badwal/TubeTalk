const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    id: String,
    email: String,
    password: String,
    name: String,
    isAdmin: Boolean
  },
  {collection: 'users'}

)

const userModal = mongoose.model('User', userSchema);

module.exports = userModal;