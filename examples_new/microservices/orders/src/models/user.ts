import mongoose from 'mongoose';

//define attrs
interface UserAttrs {
  username: string;
  id: string;
}
// add a method 'build' to the UserModel
// mongoose has built-in Model class that takes 'UserDoc'
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
//create user data in the database in this shape
interface UserDoc extends mongoose.Document {
  username: string;
}
//create the Schema in mongoose with defined requirements
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    //anytime we create Json formatted data, transform the user document as following
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  //returning user document with (attrs) passed in
  return new User({
    _id: attrs.id,
    username: attrs.username,
  });
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
