import useTogglePost from "../../hooks/useTogglePost";
import React from "react";
import { useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
/* ====================================================== */

const PostLike = ({ data, direction = "", className = "", size = 25 }) => {
  const { currentUser } = useSelector((state) => state.user);
  const {
    amount: likeAmount,
    handleTogglePost: handleLikePost,
    toggle: isLiked,
  } = useTogglePost(data, currentUser?.userId, "likes");

  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center gap-1",
        direction
      )}
    >
      <span
        onClick={handleLikePost}
        className={twMerge(
          `${
            isLiked ? "text-Crimson" : "text-white"
          } w-[48px] cursor-pointer hover:bg-MidnightGray flex items-center justify-center h-[48px] bg-CharcoalGray rounded-full`,
          className
        )}
      >
        <AiFillHeart size={size} />
      </span>
      <small className="text-4xl font-semibold xl:font-medium xl:text-sm">
        {likeAmount.length || "0"}
      </small>
    </div>
  );
};

export default PostLike;
