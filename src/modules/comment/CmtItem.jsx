import React from "react";
import UserAvatar from "../user/UserAvatar";
import { formatDateTime } from "../../utils/reuse-function";
import { Link } from "react-router-dom";
import Skeleton from "../../components/loading/Skeleton";
import CmtDropdown from "./CmtDropdown";
/* ====================================================== */

const CmtItem = ({ data }) => {
  const date = formatDateTime(data?.createdAt);

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-start gap-3">
        <UserAvatar size="lg" avatar={data?.user?.photoURL} />
        <div className="flex flex-col gap-2">
          <Link
            to={`/${data?.user?.slug}`}
            className="font-semibold cursor-pointer hover:underline"
          >
            {data?.user?.username}
          </Link>
          <p>{data?.comment}</p>
          <small className="text-xs">{date}</small>
        </div>
      </div>

      <CmtDropdown data={data} />
    </div>
  );
};

export default CmtItem;

export const CmtItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-start w-full gap-3">
        <Skeleton className="w-[45px] h-[45px] rounded-full" />
        <div className="flex flex-col flex-1 gap-2">
          <Skeleton className="w-[120px] h-[18px] rounded-sm" />
          <Skeleton className="w-full h-[16px] rounded-sm" />
          <Skeleton className="w-[300px] h-[16px] rounded-sm" />
        </div>
      </div>
    </div>
  );
};
