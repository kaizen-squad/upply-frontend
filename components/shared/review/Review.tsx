import { ReviewProps } from "@/types";
import { FC } from "react";
import Rating from "react-ratings-star";

const Review:FC<ReviewProps> = ({task_id, comment, rating}) => {
    
  return (
    <div className="p-3 px-5 border border-gray-100 rounded-xs bg-white shadow-gallery-gray-93 shadow-[5px_5px_1px_0]">
        <div className="flex items-center justify-between">
            <Rating
                value={rating}
                size={35}
                fullColor="var(--alizarin-crimson-red-51)"  // jaune
                isSelectable={false}
                
            />
            <p className="font-bold text-lg">{rating}/5</p>
        </div>

        <p className="mt-3">{comment}</p>
    </div>
  )
}

export default Review