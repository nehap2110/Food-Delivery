import Razorpay from "razorpay";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from "crypto";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      payment_capture: 1,
    };

    razorpay.orders.create(options, async (err, order) => {
      if (err) {
        console.log("Razorpay order creation failed", err);
        return res.json({
          success: false,
          message: "Error creating payment order",
        });
      }

      res.json({
        success: true,
        message: "order created",
        order: order,
        orderData: {
          items,
          amount,
          address,
          userId: req.user
        }
      });
    });
  } catch (error) {
    console.log("error in place order (order controller) ", error.message);
    res.json({ success: false, message: "error in server" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { paymentId, orderId, signature, orderData } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature === signature) {
      // Create and save the order only after successful payment verification
      const newOrder = new orderModel({
        userId: orderData.userId,
        items: orderData.items,
        amount: orderData.amount,
        address: orderData.address,
        razorpayOrderId: orderId,
        payment: true
      });

      await newOrder.save();
      await userModel.findByIdAndUpdate(orderData.userId, { cartData: [] });
      
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log("error in payment verification", error.message);
    res.json({ success: false, message: "server error" });
  }
};
export const getOrders = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user);

    const orderData = await orderModel.find({
      userId,
      payment: true,
    });

    res.json({ success: true, data: orderData });

  } catch (error) {
    console.log("error in get orders", error.message);
    res.json({ success: false, message: "error in server" });
  }
};