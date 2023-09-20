import React from "react";
import UserAvatar from "./UserAvatar";
import { useSelector } from "react-redux";

const UserItem = () => {
  return (
    <li className="h-[48px] px-5  flex items-center cursor-pointer font-semibold hover:bg-CharcoalGray transition-all rounded-sm gap-3 text-lg">
      <UserAvatar size="base" avatar={"https://source.unsplash.com/random"} />
      <div>
        <h3 className="text-sm font-semibold">Nobuyuki</h3>
        <p className="text-xs opacity-80">@Nobuyuki</p>
      </div>
    </li>
  );
};

export default UserItem;
