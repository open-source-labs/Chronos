import mongoose from 'mongoose';

interface InventoryAttrs {
  id: string;
  itemName: string;
  sellerId: string; // some user's id)
  unitPrice: number;
}
// define item attributes
interface InventoryModel extends mongoose.Model<InventoryDoc> {
  build(attrs: InventoryAttrs): InventoryDoc;
}
//create item data in the database with these types;
interface InventoryDoc extends mongoose.Document {
  itemName: string;
  sellerId: mongoose.Types.ObjectId;
  unitPrice: number;
  units: number;
}
// create the Schema in mongoose with defines requirements
const InventorySchema = new mongoose.Schema(
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
    units: {
      type: Number,
      required: true,
      default: 1,
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
InventorySchema.statics.build = (attrs: InventoryAttrs) => {
  //returning item document with (attrs) passed in
  return new Inventory({
    _id: new mongoose.Types.ObjectId(attrs.id),
    itemName: attrs.itemName,
    sellerId: attrs.sellerId,
    unitPrice: attrs.unitPrice,
  });
};
const Inventory = mongoose.model<InventoryDoc, InventoryModel>('Inventory', InventorySchema);
export { Inventory };
