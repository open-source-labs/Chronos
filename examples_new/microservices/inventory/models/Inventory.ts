import mongoose from 'mongoose';

interface InventoryAttrs {
  itemId: string;
  units: number;
}

interface InventoryModel extends mongoose.Model<InventoryDoc> {
  build(attrs: InventoryAttrs): InventoryDoc;
}
//create inventory data in the database in this shape
interface InventoryDoc extends mongoose.Document {
  itemId: string;
  units: number;
}
//create the Schema in mongoose with defined requirements
const inventorySchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      unique: true,
    },
    units: {
      type: Number,
      required: true,
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

inventorySchema.statics.build = (attrs: InventoryAttrs) => {
  return new Inventory(attrs);
};

const Inventory = mongoose.model<InventoryDoc, InventoryModel>('Inventory', inventorySchema);

export { Inventory };
