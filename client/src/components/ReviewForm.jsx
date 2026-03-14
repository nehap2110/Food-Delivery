import axios from "axios";
import { useState } from "react";
import StarRating from "./StarRating";
import toast from "react-hot-toast";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ReviewForm = ({ foodId, foodName, onSuccess }) => {

  const [rating,setRating] = useState(0);
  const [comment,setComment] = useState("");

  const { backendUrl } = useContext(AppContext);

  const submitReview = async (e) => {

     e.preventDefault();
     console.log("Submitting review...");
     console.log("FoodId sent:", foodId);
  const token = localStorage.getItem("token");
  
  try {
    const res = await axios.post(
      backendUrl + "/api/review/add",
      { foodId, rating, comment },
      { headers: { token } }
    );

    if (res.data.success) {
      onSuccess();   // ⭐ CLOSE MODAL
    }
   
  } catch (error) {
    toast.error("Failed to submit review");
  }
  };

  return (
    <div className="flex flex-col gap-1">

       <h2 className="text-xl font-semibold mb-4">
         Review for {foodName}
        </h2>

     
      

      <StarRating rating={rating} setRating={setRating}/>
      
      <h2>Write a Review</h2>

      <textarea
        placeholder="Write your review"
        onChange={(e)=>setComment(e.target.value)}
      />

     <button type="button" onClick={submitReview} className="bg-green-800 rounded-md">
        Submit Review
        </button>

    </div>
  );
};

export default ReviewForm;