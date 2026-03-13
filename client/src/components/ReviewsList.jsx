import { useEffect, useState } from "react";
import axios from "axios";

const ReviewsList = ({ foodId }) => {

  const [reviews,setReviews] = useState([]);

  useEffect(()=>{

    const fetchReviews = async ()=>{

      const res = await axios.get(`/api/review/${foodId}`);

      if(res.data.success){
        setReviews(res.data.reviews);
      }

    };

    fetchReviews();

  },[foodId]);

  return (

    <div>

      <h3>Customer Reviews</h3>

      {reviews.length === 0 && (
        <p>No reviews yet</p>
      )}

      {reviews.map((review)=>(
        <div key={review._id} className="review">

          <p>
            <strong>{review.userId?.name}</strong>

            {review.verifiedPurchase && (
              <span style={{color:"green", marginLeft:"10px"}}>
                ✔ Verified Purchase
              </span>
            )}

          </p>

          <p>⭐ {review.rating}</p>

          <p>{review.comment}</p>

        </div>
      ))}

    </div>

  );

};

export default ReviewsList;