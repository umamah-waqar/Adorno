import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectdatabase from "./config/db.js";
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import {upload} from "./middleware/upload.js";
import {cloudinary} from "./config/cloudinary.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      {
        folder: "adorno_products",
      }
    );

    res.json({
      imageUrl: result.secure_url,
    });

  } catch (error) {
    console.log("cloudinary upload error", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users",userRouter)
app.use("/api/products",productRouter);
app.use("/api/orders",orderRouter);
app.use("/api/upload", uploadRoutes);
connectdatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});