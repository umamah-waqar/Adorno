import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectdatabase from "./config/db.js";
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users",userRouter)
app.use("/api/products",productRouter);
app.use("/api/orders",orderRouter);
connectdatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});