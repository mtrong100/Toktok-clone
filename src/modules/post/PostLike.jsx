import React from "react";
import { AiFillHeart } from "react-icons/ai";
import useToggleLikePost from "../../hooks/useToggleLikePost";
import { useSelector } from "react-redux";

const PostLike = ({ data }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { handleLikePost, likeAmount, isLiked } = useToggleLikePost(
    data,
    currentUser?.userId
  );

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span
        onClick={handleLikePost}
        className={`${
          isLiked ? "text-Crimson" : "text-white"
        } w-[48px] cursor-pointer hover:bg-MidnightGray flex items-center justify-center h-[48px] bg-CharcoalGray rounded-full`}
      >
        <AiFillHeart size={25} />
      </span>
      <small className="text-sm font-medium">{likeAmount.length || "0"}</small>
    </div>
  );
};

export default PostLike;
