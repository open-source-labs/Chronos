// Insert the MongoDB URI for your private User database in place of the example URI provided below.
const MONGO_URI = 'mongodb+srv://haoyuliu0914:Cc123456@cluster0.7yx6vky.mongodb.net/?retryWrites=true&w=majority';

const mongoose = require('mongoose');

const userDB = mongoose.createConnection(MONGO_URI);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  services: [],
  mode: { type: String, default: 'light' },
});

const UserModel = userDB.model('users', userSchema);
module.exports = UserModel;
