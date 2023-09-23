import React from "react";
import { BiLink } from "react-icons/bi";

const PostShare = ({ onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="w-[48px] cursor-pointer hover:bg-MidnightGray transition-all text-white flex items-center justify-center h-[48px] bg-CharcoalGray rounded-full"
    >
      <BiLink size={24} />
    </div>
  );
};

export default PostShare;
