import React from "react";
import { useSelector } from "react-redux";
import { BsFillBookmarkFill } from "react-icons/bs";
import useTogglePost from "../../hooks/useTogglePost";
/* ====================================================== */

const PostSave = ({ data }) => {
  const { currentUser } = useSelector((state) => state.user);
  const {
    amount,
    handleTogglePost: handleSavePost,
    toggle: isSaved,
  } = useTogglePost(data, currentUser?.userId, "saves");

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span
        onClick={handleSavePost}
        className={`${
          isSaved ? "text-ButtercupYellow" : "text-white"
        } w-[48px] cursor-pointer hover:bg-MidnightGray flex items-center justify-center h-[48px] bg-CharcoalGray rounded-full`}
      >
        <BsFillBookmarkFill size={20} />
      </span>
      <small className="text-sm font-medium">{amount.length || "0"}</small>
    </div>
  );
};

export default PostSave;
