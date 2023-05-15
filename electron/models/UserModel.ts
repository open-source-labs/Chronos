// INSERT URI TO MONGODB TO SET UP USER DATABASE
const MONGO_URI = 'mongodb+srv://seconddbtest:seconddbtest@cluster0.yhztme0.mongodb.net/?retryWrites=true&w=majority';
const mongoose = require('mongoose')

const db2 = mongoose.createConnection(MONGO_URI)
.then(() => {
	console.log('Connected to User database...');
})
.catch(err => {
	console.log('Error connecting to User database: ', err);
})
console.log('establishing connection to database');


const userSchema = new mongoose.Schema({
		username: {type: String, required:true, unique: true},
		password: {type: String, required:true},
		email: String,
    services: [],
    mode: {type: String, default: 'light'}
});

const UserModel = db2.model('users', userSchema);
module.exports = UserModel;