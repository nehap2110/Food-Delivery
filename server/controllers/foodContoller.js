import foodModel from "../models/foodModel.js";
import { redis } from "../config/redis.js";

export const addFood = async (req, res) => {
  try {
    const { name, image, price, category, description, discount } = req.body;

    if (isNaN(price) || price <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid price value." });
    }

    const priceNumber = parseFloat(price);
    const discountValue = discount
      ? parseFloat(discount)
      : priceNumber + 3;

    const food = new foodModel({
      name,
      image,
      price: priceNumber,
      discount: discountValue,
      category,
      note: description,
    });

    await food.save();


    try {
      await redis.del("all_foods");
    } catch { }

    res.status(200).json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getFood = async (req, res) => {
  try {
    let cachedFoods = null;
    try {
      cachedFoods = await redis.get("all_foods");
    } catch { }

    if (cachedFoods) {
      return res.status(200).json({
        success: true,
        foods: cachedFoods,
      });
    }


    const foods = await foodModel.find({});


    try {
      await redis.set("all_foods", foods, { ex: 300 });
    } catch { }

    res.status(200).json({ success: true, foods });
  } catch (error) {
    console.error("Error fetching food:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteFood = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res.json({ success: false, message: "Food ID required" });

    const food = await foodModel.findByIdAndDelete(id);
    if (!food)
      return res.json({ success: false, message: "Food not found" });


    try {
      await redis.del("all_foods");
    } catch { }

    const updatedFoods = await foodModel.find({});
    res.status(200).json({
      success: true,
      message: "Food item deleted successfully",
      data: updatedFoods,
    });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
