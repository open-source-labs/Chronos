import mongoose from 'mongoose';

interface ItemAttrs {
  itemName: string;
}

// define item attributes
interface ItemModel extends mongoose.Model<ItemDoc> {
  build(attrs: ItemAttrs): ItemDoc;
}

//create item data in the database with these types;
interface ItemDoc extends mongoose.Document {
  itemName: string;
}

// create the Schema in mongoose with defines requirements
const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    //anytime we create JSON formatted data, transform item using following rules
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

itemSchema.statics.build = (attrs: ItemAttrs) => {
  //returning item document with (attrs) passed in
  return new Item(attrs);
};

const Item = mongoose.model<ItemDoc, ItemModel>('Item', itemSchema);

export { Item };
