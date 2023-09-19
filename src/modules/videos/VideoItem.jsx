import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { BsFillBookmarkFill, BsThreeDots } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import VideoIcon from "./VideoIcon";
import useQuerySnapshot from "../../hooks/useQuerySnapshot";
import { formatDateTime } from "../../utils/reuse-function";

const VideoItem = ({ data }) => {
  const { data: user } = useQuerySnapshot("users", "userId", data?.userId);
  const date = formatDateTime(data?.createdAt);

  return (
    <article className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[53px] h-[53px] flex-shrink-0">
            <img
              src={user?.photoURL}
              className="rounded-full img-cover"
              alt="user-avatar"
            />
          </div>

          <div>
            <h4 className="font-semibold cursor-pointer hover:underline">
              {user?.username}
            </h4>
            <p className="w-full max-w-sm mt-1 text-sm leading-snug">
              {data?.title}
            </p>
          </div>
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
          className=" max-h-[600px] rounded-md mt-2"
        />
        <section className="flex flex-col gap-3">
          <VideoIcon amount={"284.4K"}>
            <AiFillHeart size={25} />
          </VideoIcon>
          <VideoIcon amount={"1383"}>
            <FaCommentDots size={22} />
          </VideoIcon>
          <VideoIcon amount={"94"}>
            <BsFillBookmarkFill size={20} />
          </VideoIcon>
          <VideoIcon amount={"9457"}>
            <IoIosShareAlt size={24} />
          </VideoIcon>
        </section>
      </div>
    </article>
  );
};

export default VideoItem;
