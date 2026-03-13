import express from "express";
import {
  addReview,
  getReviews,
  //getAverageRating
} from "../controllers/reviewController.js";
import { checkAuth } from "../middlewares/auth.js";

const reviewRouter = express.Router();

reviewRouter.post("/add",checkAuth, addReview);
reviewRouter.get("/:foodId", getReviews);
//reviewRouter.get("/rating/:foodId", getAverageRating);

export default reviewRouter;