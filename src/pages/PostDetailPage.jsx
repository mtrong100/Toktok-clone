import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocRef from "../hooks/useFetchDocRef";
import { BiArrowBack } from "react-icons/bi";
import Skeleton from "../components/loading/Skeleton";
import UserAvatar from "../modules/user/UserAvatar";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import { formatDateTime } from "../utils/reuse-function";
import Button from "../components/button/Button";
import PostLike from "../modules/post/PostLike";
import PostCmt from "../modules/post/PostCmt";
import PostSave from "../modules/post/PostSave";
/* ====================================================== */

const PostDetailPage = () => {
  const { id: postId } = useParams();
  const { data, isLoading } = useFetchDocRef("posts", postId);
  const { data: user } = useQuerySnapshot("users", "userId", data?.userId);
  const date = formatDateTime(data?.createdAt);

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="flex flex-row h-screen">
      {/* Video container */}
      <div className="relative w-full flex items-center justify-center max-w-[992px] mx-auto overflow-hidden bg-black ">
        {isLoading && (
          <Skeleton className="z-20 w-[422px]  object-contain h-full rounded-sm"></Skeleton>
        )}
        {!isLoading && data && (
          <video
            controls
            loop
            autoPlay
            src={data?.video}
            className="z-20 object-contain h-full rounded-sm"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 blur-xl">
          {!isLoading && data && (
            <video muted src={data?.video} className="img-cover" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5">
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

            <Button variant="solid" className="rounded-md">
              Follow
            </Button>
          </div>

          <div className="mt-4">
            <p className="w-full max-w-sm my-1 text-sm leading-snug">
              {data?.title}{" "}
              {data?.hashtag && (
                <span className="font-semibold text-Skyblue ">
                  {data?.hashtag}
                </span>
              )}
            </p>
            {data?.music && (
              <p className="inline-block font-mono text-sm font-medium capitalize">
                🎵 {data?.music} 🎵
              </p>
            )}
          </div>
        </div>

        {/* Post action */}
        <section className="flex flex-row gap-5 mt-5">
          <PostLike
            data={data}
            direction="flex-row "
            className="w-[35px] h-[35px]"
            size={20}
          />
          <PostCmt
            data={data}
            direction="flex-row "
            className="w-[35px] h-[35px]"
            size={20}
          />
          <PostSave
            data={data}
            direction="flex-row "
            className="w-[35px] h-[35px]"
            size={18}
          />
        </section>
      </div>

      <Link
        to="/"
        className="fixed flex items-center rounded-full justify-center top-6 left-8 w-[40px] h-[40px] bg-[#3f3f3f] hover:bg-CharcoalGray text-white cursor-pointer"
      >
        <BiArrowBack size={22} />
      </Link>
    </section>
  );
};

export default PostDetailPage;
