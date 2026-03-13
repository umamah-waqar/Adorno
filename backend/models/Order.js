import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    }
  ],
  totalPrice:{type:Number,required:true},
  email: { type: String, required: true },       // user email at checkout
  contactnum: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, default: "Cash on Delivery" },
  status: { type: String, default: "Order Accepted" },
}, {timestamps: true});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;