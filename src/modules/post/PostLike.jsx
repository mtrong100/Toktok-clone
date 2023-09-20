import useTogglePost from "../../hooks/useTogglePost";
import React from "react";
import { useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
/* ====================================================== */

const PostLike = ({ data }) => {
  const { currentUser } = useSelector((state) => state.user);
  const {
    amount: likeAmount,
    handleTogglePost: handleLikePost,
    toggle: isLiked,
  } = useTogglePost(data, currentUser?.userId, "likes");

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
