import React from "react";
import { useSelector } from "react-redux";
import { BsFillBookmarkFill } from "react-icons/bs";
import useTogglePost from "../../hooks/useTogglePost";
import { twMerge } from "tailwind-merge";
/* ====================================================== */

const PostSave = ({
  data,
  direction = "flex-col",
  className = "",
  size = 20,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const {
    amount,
    handleTogglePost: handleSavePost,
    toggle: isSaved,
  } = useTogglePost(data, currentUser?.userId, "saves");

  return (
    <div className={`${direction} flex  items-center justify-center gap-1`}>
      <span
        onClick={handleSavePost}
        className={twMerge(
          `${
            isSaved ? "text-ButtercupYellow" : "text-white"
          } w-[48px] cursor-pointer hover:bg-MidnightGray flex items-center justify-center h-[48px] bg-CharcoalGray rounded-full`,
          className
        )}
      >
        <BsFillBookmarkFill size={size} />
      </span>
      <small className="text-4xl font-semibold xl:font-medium xl:text-sm">
        {amount.length || "0"}
      </small>
    </div>
  );
};

export default PostSave;
