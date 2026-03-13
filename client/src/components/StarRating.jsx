import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, setRating }) => {

  return (
    <div className="flex flex-row mb-2">
      {[1,2,3,4,5].map((star)=>(
        <FaStar
          key={star}
          size={22}
          color={star <= rating ? "gold" : "lightgray"}
          style={{ cursor:"pointer" }}
          onClick={()=>setRating(star)}
        />
      ))}
    </div>
  );

};

export default StarRating;