import React from "react";
import { twMerge } from "tailwind-merge";

const VideoIcon = ({
  children,
  amount,
  onClick = () => {},
  className = "",
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span
        onClick={onClick}
        className={twMerge(
          "w-[48px] cursor-pointer hover:bg-MidnightGray transition-all text-white flex items-center justify-center h-[48px] bg-CharcoalGray rounded-full",
          className
        )}
      >
        {children}
      </span>
      <small className="text-sm font-medium">{amount}</small>
    </div>
  );
};

export default VideoIcon;
