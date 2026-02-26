import express from "express";
import {
  addToCart,
  deleteCart,
  getCart,
  removeFromCart,
  removeItem,
} from "../controllers/cartController.js";
import { checkAuth } from "../middlewares/auth.js";

const cartRoute = express.Router();

cartRoute.post("/add", checkAuth, addToCart);
cartRoute.post("/remove", checkAuth, removeFromCart);
cartRoute.post("/removeItem", checkAuth, removeItem);
cartRoute.post("/delete", checkAuth, deleteCart);
cartRoute.get("/getCart", checkAuth, getCart);

export default cartRoute;
