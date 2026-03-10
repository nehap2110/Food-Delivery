import express from "express";
import {
  addAdmin,
  adminLogin,
  getOrders,
  updateOrderStatus,
} from "../controllers/adminController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { checkAuth } from "../middlewares/auth.js";

const adminRoute = express.Router();

adminRoute.post("/login", adminLogin);
adminRoute.post("/register", addAdmin);
adminRoute.get("/getOrders",checkAuth, verifyAdmin, getOrders);
adminRoute.put("/updateOrderStatus",checkAuth,verifyAdmin, updateOrderStatus);

export default adminRoute;
