import 'dotenv/config';// Imported dotenv to process env files to protect our URI 
// Insert the MongoDB URI for your private User database in place of the example URI provided below.
const MONGO_URI = process.env.MONGO_URI;//URI from .env file in electron folder root directory 

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
