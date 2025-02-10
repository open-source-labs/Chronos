// models/user.ts
import mongoose from 'mongoose';

// 1. Interface for properties required to create a new User
interface UserAttrs {
  userId: string;
  username: string;
}

// 2. Interface that describes the properties a User Document has
interface UserDoc extends mongoose.Document {
  userId: string;
  username: string;
}

// 3. Interface that describes the properties a User Model has,
//    including a custom static method for type-safe creation.
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// 4. Define the schema for a User
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
});

// 5. Add a static build method to the schema to enforce type checking
userSchema.statics.build = (attrs: UserAttrs): UserDoc => {
  return new User(attrs);
};

// 6. Create the User model using the schema and interfaces
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
