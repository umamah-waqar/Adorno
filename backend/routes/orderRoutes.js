import express from "express";
import orderModel from "../models/Order.js";
import {protect,admin} from "../middleware/auth.js";


const orderRouter = express.Router();

orderRouter.post("/",protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const {products, totalPrice,email, contactnum, address, paymentMethod } = req.body;
    const order = await orderModel.create({userId,products,totalPrice,email,contactnum,address,paymentMethod, status: "Order Accepted"});
    res.status(201).json(order);
  } catch(error) {
    console.log("error creating order", error);
    res.status(500).json({ message: error.message });
  }
});

orderRouter.get("/myorders",protect, async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    console.log("error fetching user orders", error);
    res.status(500).json({ message: error.message });
  }
});

orderRouter.get("/", protect, async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log("error fetching all orders", error);
    res.status(500).json({ message: error.message });
  }
});

export default orderRouter;