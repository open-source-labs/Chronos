import mongoose from 'mongoose';
//define type of objects that is being passed into build method
interface OrderAttrs {
  itemId: string;
  amount: number;
  totalPrice: number;
  sellerId: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}
//create inventory data in the database in this shape
interface OrderDoc extends mongoose.Document {
  itemId: string;
  amount: number;
  totalPrice: number;
  sellerId: string;
}

//create the Schema in mongoose with defined requirements
const OrderSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: String,
      require: true,
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

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    itemId: attrs.itemId,
    amount: attrs.amount,
    totalPrice: attrs.totalPrice,
    sellerId: attrs.sellerId,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', OrderSchema);

export { Order };
