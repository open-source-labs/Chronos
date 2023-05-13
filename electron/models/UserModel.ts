// const MONGO_URI = 'mongodb+srv://chronoslany:chronoslany@cluster0.tvzzzbv.mongodb.net/?retryWrites=true&w=majority';
const MONGO_URI = 'mongodb+srv://seconddbtest:seconddbtest@cluster0.yhztme0.mongodb.net/?retryWrites=true&w=majority';
// import mongoose, { Schema, Document } from 'mongoose';

// export interface IService extends Document {
//   microservice: string;
//   interval: number;
// }
const mongoose = require('mongoose')

const db2 = mongoose.createConnection(MONGO_URI);
console.log('establishing connection to database');
// const connectToUserDB = async (URI: string) => {
// 	console.log('connecting to user info db...')
// 	return await mongoose.createConnection(URI);
// }


const userSchema = new mongoose.Schema({
	// User: {
		username: {type: String, required:true, unique: true},
		password: {type: String, required:true},
		email: String,
    services: [],
    mode: {type: String, default: 'light'}
	// },
});

// export default mongoose.model<IService>('services', ServicesSchema);

// export default mongoose.model('User', userSchema);
const UserModel = db2.model('users', userSchema);

module.exports = UserModel;