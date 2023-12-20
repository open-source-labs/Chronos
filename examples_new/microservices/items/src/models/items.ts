import mongoose from 'mongoose';

interface ItemAttrs {
  itemName: string;
  sellerId: string; // some user's id)
  unitPrice: number;
}

// define item attributes
interface ItemModel extends mongoose.Model<ItemDoc> {
  build(attrs: ItemAttrs): ItemDoc;
}

//create item data in the database with these types;
interface ItemDoc extends mongoose.Document {
  itemName: string;
  sellerId: string;
  unitPrice: number;
}

// create the Schema in mongoose with defines requirements
const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      // unique: true,
    },
    sellerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    unitPrice: {
      type: Number,
      required: true,
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
