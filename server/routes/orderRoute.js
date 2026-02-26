import express from 'express'
import { getOrders, placeOrder,verifyPayment } from '../controllers/orderController.js';
import { checkAuth } from '../middlewares/auth.js';


const orderRoute = express.Router();

orderRoute.post("/placeOrder",checkAuth,placeOrder)
orderRoute.post("/verifyPayment",checkAuth,verifyPayment)
orderRoute.get("/getOrders",checkAuth,getOrders)

export default orderRoute;