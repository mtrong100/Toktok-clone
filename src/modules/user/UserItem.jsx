import React from "react";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import Skeleton from "../../components/loading/Skeleton";
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

export const UserItemSkeleton = () => {
  return (
    <div className="h-[48px] px-5  flex items-center cursor-pointer font-semibold  transition-all rounded-sm gap-3 text-lg">
      <Skeleton className="w-[36px] h-[36px] rounded-full"></Skeleton>
      <div>
        <Skeleton className="h-[16px] w-[90px]  rounded-sm"></Skeleton>
        <Skeleton className="h-[10px] mt-1 w-[40px]  rounded-sm"></Skeleton>
      </div>
    </div>
  );
};
