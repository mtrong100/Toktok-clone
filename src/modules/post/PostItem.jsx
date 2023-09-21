import VideoIcon from "../videos/VideoIcon";
import UserAvatar from "../user/UserAvatar";
import useQuerySnapshot from "../../hooks/useQuerySnapshot";
import Skeleton from "../../components/loading/Skeleton";
import React from "react";
import PostSave from "./PostSave";
import PostMeta from "./PostMeta";
import PostLike from "./PostLike";
import { IoIosShareAlt } from "react-icons/io";
import { formatDateTime } from "../../utils/reuse-function";
import { FaCommentDots } from "react-icons/fa";
import PostCmt from "./PostCmt";
/* ====================================================== */

const PostItem = ({ data }) => {
  const { data: user } = useQuerySnapshot("users", "userId", data?.userId);
  const date = formatDateTime(data?.createdAt);

  return (
    <article className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <UserAvatar size="xl" avatar={user?.photoURL} />
          <PostMeta
            username={user?.username}
            slug={user?.slug}
            date={date}
            title={data?.title}
            hashtag={data?.hashtag}
            music={data?.music}
          />
        </div>

        <button className="h-[36px] px-5 border flex items-center justify-center rounded-sm cursor-pointer font-medium border-Crimson text-Crimson hover:bg-CharcoalGray">
          Follow
        </button>
      </div>

      <div className="ml-[62px] flex items-end gap-5">
        <video
          controls
          loop
          autoPlay
          muted
          src={data?.video}
          className="max-h-[600px] rounded-md"
        />

        {/* Post action */}
        <section className="flex flex-col gap-3">
          <PostLike data={data} />
          <PostCmt data={data} />
          <PostSave data={data} />
          <VideoIcon amount={"9457"}>
            <IoIosShareAlt size={24} />
          </VideoIcon>
        </section>
      </div>
    </article>
  );
};

export default PostItem;

export const PostItemItemSkeleton = () => {
  return (
    <article className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <Skeleton className="w-[53px] h-[53px] rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[16px] w-[100px] " />
            <Skeleton className="w-full h-[18px] " />
            <Skeleton className="h-[20px] w-[220px] " />
          </div>
        </div>
      </div>
      <div className="ml-[62px] flex items-end gap-5">
        <Skeleton className="w-[350px] h-[600px] rounded-md" />
      </div>
    </article>
  );
};
