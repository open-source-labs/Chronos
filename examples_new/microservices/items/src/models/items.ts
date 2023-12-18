import mongoose from 'mongoose';

interface ItemAttrs {
  itemName: string;
  buyerId: string; // some user's id)
  unitPrice: number;
}

interface ItemModel extends mongoose.Model<ItemDoc> {
  build(attrs: ItemAttrs): ItemDoc;
}

interface ItemDoc extends mongoose.Document {
  itemName: string;
  buyerId: string;
  unitPrice: number;
}

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      unique: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.buyerId;
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
