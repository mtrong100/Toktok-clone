import React from "react";

const VideoIcon = ({ children, amount }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span className="w-[48px]  cursor-pointer hover:bg-MidnightGray transition-all text-white flex items-center justify-center h-[48px] bg-CharcoalGray rounded-full">
        {children}
      </span>
      <small className="text-sm font-medium">{amount}</small>
    </div>
  );
};

export default VideoIcon;
