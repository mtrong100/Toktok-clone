import React from "react";
import DefaultAvatar from "/user.png";
import { twMerge } from "tailwind-merge";

const sizeClasses = {
  xl: "w-[53px] h-[53px]",
  lg: "w-[40px] h-[40px]",
  md: "w-[35px] h-[35px]",
  base: "w-[32px] h-[32px]",
};

const UserAvatar = ({ avatar, size = "md" }) => {
  return (
    <div className={twMerge("flex-shrink-0", sizeClasses[size])}>
      <img
        src={avatar || DefaultAvatar}
        className="rounded-full img-cover"
        alt="user-avatar"
      />
    </div>
  );
};

export default UserAvatar;
