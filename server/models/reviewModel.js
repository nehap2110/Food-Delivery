import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "food",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    default: ""
  },
  verifiedPurchase: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);