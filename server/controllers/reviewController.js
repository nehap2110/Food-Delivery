import Review from "../models/reviewModel.js";
import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";
import mongoose from "mongoose";

// Add Review
export const addReview = async (req, res) => {
  try {
    const userId = req.user;
   const { foodId, rating, comment } = req.body;
   

   if (!mongoose.Types.ObjectId.isValid(foodId)) {
  return res.json({
    success: false,
    message: "Invalid foodId"
  });
}
    
     console.log("Incoming review:", req.body);

    // Check if user already reviewed
    const existing = await Review.findOne({ userId, foodId });
    console.log("Existing review:", existing);

    if (existing) {
      return res.json({
        success: false,
        message: "You already reviewed this item"
      });
    }

    

    // Check if user ordered this food
   const order = await orderModel.findOne({
  userId,
  status: "Delivered",
 "items.foodId": new mongoose.Types.ObjectId(foodId)
});

console.log("Order found:", order);

    if (!order) {
      return res.json({
        success: false,
        message: "You can review only after purchasing this item"
      });
    }


    const review = new Review({
      userId,
      foodId,
      rating,
      comment,
      verifiedPurchase: true
    });

    await review.save();

    const stats = await Review.aggregate([
  { $match: { foodId: new mongoose.Types.ObjectId(foodId) } },
  {
    $group: {
      _id: "$foodId",
      avgRating: { $avg: "$rating" },
      reviewCount: { $sum: 1 }
    }
  }
]);

await foodModel

.findByIdAndUpdate(foodId, {
  avgRating: stats[0].avgRating ||0,
  reviewCount: stats[0].reviewCount || 0,
});

    res.json({
      success: true,
      message: "Review submitted successfully"
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error submitting review" });
  }
};


// export const getReviews = async (req, res) => {

//   const { foodId } = req.params;

//   const reviews = await Review.find({ foodId })
//     .populate("userId", "name");

//   res.json({
//     success: true,
//     reviews
//   });

// };


// export const getAverageRating = async (req, res) => {

//   const { foodId } = req.params;

//   const result = await Review.aggregate([
//     { $match: { foodId: new mongoose.Types.ObjectId(foodId) } },
//     {
//       $group: {
//         _id: "$foodId",
//         avgRating: { $avg: "$rating" },
//         totalReviews: { $sum: 1 }
//       }
//     }
//   ]);

//   res.json({
//     success: true,
//     rating: result[0] || { avgRating: 0, totalReviews: 0 }
//   });

// };


export const getReviews = async (req, res) => {
  try {

    const { foodId } = req.params;
    console.log("FoodId from params:", foodId);

    const reviews = await Review.find({foodId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

      console.log("Reviews found:", reviews);

    const avg = await Review.aggregate([
      { $match: { foodId: new mongoose.Types.ObjectId(foodId) } },
      {
        $group: {
          _id: "$foodId",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      reviews,
      avgRating: avg[0]?.avgRating || 0,
      totalReviews: avg[0]?.totalReviews ||0
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching reviews" });
  }
};