import express from "express";
import { addFood, deleteFood, getFood } from "../controllers/foodContoller.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const foodRoute = express.Router();

const upload = multer({
  dest: "temp_uploads",
});



foodRoute.post("/add-food", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, description, discount } = req.body;

    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "food-images",
      transformation: [{ width: 360, height: 280, crop: "limit" }],
      quality: "auto",
      fetch_format: "auto",
    });

    fs.unlinkSync(req.file.path);

    req.body.image = cloudinaryResult.secure_url;

    await addFood(req, res);
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
});
foodRoute.get("/get-food", getFood);
foodRoute.post("/delete", deleteFood);

export default foodRoute;
