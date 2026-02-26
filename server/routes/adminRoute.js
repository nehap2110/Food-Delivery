import express from "express";
import {
  addAdmin,
  adminLogin,
  getOrders,
  updateOrderStatus,
} from "../controllers/adminController.js";

const adminRoute = express.Router();

adminRoute.post("/login", adminLogin);
adminRoute.post("/register", addAdmin);
adminRoute.get("/getOrders", getOrders);
adminRoute.put("/updateOrderStatus", updateOrderStatus);

export default adminRoute;
