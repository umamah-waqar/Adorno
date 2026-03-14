import express from "express";
import {upload} from "../middleware/upload.js";
import {cloudinary} from "../config/cloudinary.js";

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