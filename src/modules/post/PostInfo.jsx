import React from "react";
import Button from "../../components/button/Button";
import UserAvatar from "../user/UserAvatar";
import useQuerySnapshot from "../../hooks/useQuerySnapshot";
import { formatDateTime } from "../../utils/reuse-function";
import ButtonFollow from "../../components/button/ButtonFollow";
/* ====================================================== */

const PostInfo = ({ data }) => {
  const { data: user } = useQuerySnapshot("users", "userId", data?.userId);
  const date = formatDateTime(data?.createdAt);

  return (
    <div className="p-4 rounded-xl bg-MidnightGray">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserAvatar size="lg" avatar={user?.photoURL} />
          <div>
            <h2 className="text-lg font-semibold capitalize">
              {user?.username}
            </h2>
            <div className="flex items-center gap-1">
              <small className="text-sm font-normal">{`@${user?.slug}`}</small>
              <span className="font-semibold">.</span>
              <small className="text-xs font-normal">{date}</small>
            </div>
          </div>
        </div>

        <ButtonFollow uid={data?.postId} />
      </div>

      <div className="mt-4">
        <p className="w-full max-w-sm my-1 text-sm leading-snug">
          {data?.title}{" "}
          {data?.hashtag && (
            <span className="font-semibold text-Skyblue ">{data?.hashtag}</span>
          )}
        </p>
        {data?.music && (
          <p className="inline-block font-mono text-sm font-medium capitalize">
            🎵 {data?.music} 🎵
          </p>
        )}
      </div>
    </div>
  );
};

export default PostInfo;
