// import mongoose, { Schema, Document } from 'mongoose';

// export interface IService extends Document {
//   microservice: string;
//   interval: number;
// }
const mongoose = require('mongoose')

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

module.exports = mongoose.model('users', userSchema)