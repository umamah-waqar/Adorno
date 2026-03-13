import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {type: String, required: true },
  description: {type: String},
  price: { type: Number, required: true },
  category: {type: String},
  image: {type: String},
  stock: { type: Number, default: 0 },
}, {timestamps:true});

const productModel = mongoose.model("Product", productSchema);
export default productModel;