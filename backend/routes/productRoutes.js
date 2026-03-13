import express from "express";
import productModel from "../models/Product.js";
import { protect, admin } from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.log("error fetching products", error);
    res.status(500).json({ message: error.message });
  }
});
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.log("error fetching product by id", error);
    res.status(500).json({ message: error.message });
  }
});

productRouter.post("/", protect, admin, async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;
    const product = await productModel.create({name,description,price,category,image,stock,});
    res.status(201).json(product);
  } catch (error) {
    console.log("error creating product", error);
    res.status(500).json({ message: error.message });
  }
});

productRouter.put("/:id", protect,admin, async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
    if (!updatedProduct) return res.status(404).json({ message: "update Product not found, error in updating product by admin" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("error updating product", error);
    res.status(500).json({ message: error.message });
  }
});

productRouter.delete("/:id",protect,admin, async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("error deleting product", error);
    res.status(500).json({ message: error.message });
  }
});

export default productRouter;