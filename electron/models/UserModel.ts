require('dotenv').config();

// INSERT URI TO MONGODB TO SET UP USER DATABASE
const MONGO_URI = process.env.USER_DB_URI;
console.log(MONGO_URI);
// const MONGO_URI = process.env.CHRONOS_USER_DB_URI;
const mongoose = require('mongoose');

const userDB = mongoose.createConnection(MONGO_URI);
//   .then(() => {
//     console.log('Connected to User database...');
//   })
//   .catch(err => {
//     console.log('Error connecting to User database: ', err);
//   });
// console.log('establishing connection to database');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  services: [],
  mode: { type: String, default: 'light' },
});

const UserModel = userDB.model('users', userSchema);
module.exports = UserModel;
