import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const FoodDetails = () => {

  const { foodId } = useParams();
  const { backendUrl } = useContext(AppContext);

  const [food,setFood] = useState(null);
  const [reviews,setReviews] = useState([]);
  const [avgRating,setAvgRating] = useState(0);
  const [totalReviews,setTotalReviews] = useState(0);

  const fetchFoodDetails = async () => {

    const res = await axios.get(`${backendUrl}/api/food/${foodId}`);

    if(res.data.success){
      setFood(res.data.food);
    }

  };

  const fetchReviews = async () => {

    const res = await axios.get(`${backendUrl}/api/review/${foodId}`);

    if(res.data.success){
      setReviews(res.data.reviews);
      setAvgRating(res.data.avgRating);
      setTotalReviews(res.data.totalReviews);
    }

  };

  useEffect(()=>{
    fetchFoodDetails();
    fetchReviews();
  },[]);

  if(!food) return <p>Loading...</p>;

  return (

    <div className="max-w-5xl mx-auto mt-20 px-4">

      <img
        src={food.image}
        alt={food.name}
        className="w-full h-[300px] object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold mt-6">{food.name}</h1>

      <p className="text-xl text-amber-600 mt-2">
        ₹{food.discount}
      </p>

      <p className="mt-2">
        ⭐ {avgRating.toFixed(1)} ({totalReviews} reviews)
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        Reviews
      </h2>

      {reviews.map((review,i)=>(
        <div key={i} className="border p-3 rounded mb-3">

          <p className="font-semibold">
            {review.userId?.name}
          </p>

          <p>{"⭐".repeat(review.rating)}</p>

          <p>{review.comment}</p>

        </div>
      ))}

    </div>
  );
};

export default FoodDetails;