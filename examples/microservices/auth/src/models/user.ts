import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

// Define attributes
interface UserAttrs {
  username: string;
  password: string;
}

// Extend mongoose.Model to include 'build' method
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Define the user document interface
interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
  createJwt: () => string;
  comparePassword: (providedPassword: string) => Promise<boolean>;
}

// Create the Schema in mongoose
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// Pre-save hook for password hashing
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (providedPassword: string) {
  return await bcrypt.compare(providedPassword, this.password);
};

// JWT creation method
userSchema.methods.createJwt = function () {
  const JWT_KEY = process.env.JWT_KEY;
  let lifetime = process.env.JWT_LIFETIME || '1d';

  if (!JWT_KEY) {
    throw new Error('❌ JWT_KEY is missing from environment variables');
  }

  // If lifetime is all digits, convert it to a number.
  // Otherwise, keep it as a string (e.g. "1d").
  const expiresIn = /^\d+$/.test(lifetime) ? Number(lifetime) : lifetime;

  // Workaround: cast expiresIn to 'any' so that TypeScript doesn't complain.
  const options: SignOptions = { expiresIn: expiresIn as any };

  return jwt.sign(
    { userId: this._id.toString() },
    JWT_KEY,
    options
  );
};


// Static method to build a user
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };












