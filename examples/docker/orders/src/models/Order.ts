import mongoose from 'mongoose';
//define type of objects that is being passed into build method
interface OrderAttrs {
  item: string;
  amount: number;

  totalPrice: number; // Add this line
  sellerId: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}
//create inventory data in the database in this shape
interface OrderDoc extends mongoose.Document {
  item: string;
  amount: number;
}

//create the Schema in mongoose with defined requirements
const OrderSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 1,
    },
totalPrice: { type: Number, required: true }, // Ensure it's included
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

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

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    item: attrs.item,
    amount: attrs.amount,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', OrderSchema);

export { Order };
