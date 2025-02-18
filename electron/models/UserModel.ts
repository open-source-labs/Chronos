import mongoose from 'mongoose';
import 'dotenv/config'; 


const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("❌ Missing MONGO_URI in environment variables!");


const userDB = mongoose.createConnection(MONGO_URI);


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: false },
  services: { type: Array, default: [] },
  mode: { type: String, default: 'light' },
});

const UserModel = userDB.model('users', userSchema);
export { UserModel };
