import React from "react";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
/* ====================================================== */

const UserItem = ({ data }) => {
  return (
    <Link
      to={`${data?.slug}`}
      className="h-[48px] px-5  flex items-center cursor-pointer font-semibold hover:bg-CharcoalGray transition-all rounded-sm gap-3 text-lg"
    >
      <UserAvatar size="base" avatar={data?.photoURL} />
      <div>
        <h3 className="text-sm font-semibold">{data?.username}</h3>
        <p className="text-xs opacity-80">{`@${data?.slug}`}</p>
      </div>
    </Link>
  );
};

export default UserItem;
