import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
//define attrs
interface UserAttrs {
  username: string;
  password: string;
}
// add a method 'build' to the UserModel
// mongoose has built-in Model class that takes 'UserDoc'
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
//create user data in the database in this shape
interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
}
//create the Schema in mongoose with defined requirements
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
    //anytime we create Json formatted data, transform the user document as following
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
//pre is built-in moogoose function that runs before the function 'save' takes place
userSchema.pre('save', async function () {
  // Check if password has been created or modified
  if (!this.isModified('password')) return;
  //if the password is modified, hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});
//schema has property: "method", custom define "comparePassword"
userSchema.methods.comparePassword = async function (providedPassword: string) {
  const isMatch = await bcrypt.compare(providedPassword, this.password);
  return isMatch;
};

userSchema.statics.build = (attrs: UserAttrs) => {
  //returning user document with (attrs) passed in
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

// const newUser = User.create({
//   poo: 'doo',
//   doo: 'doo'
// })

// const testUser = User.build({
//   username: 'derp',
//   password: 'derp',
//   doo: 'doo'
// });
// await testUser.save()

// const thisUser = await User.findById(userId)
// res.send(thisUser) || res.json(thisUser)

// testUser.password = "derpdeedoo"
