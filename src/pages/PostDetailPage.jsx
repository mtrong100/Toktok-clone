import useQuerySnapshot from "../hooks/useQuerySnapshot";
import useOnChange from "../hooks/useOnChange";
import useFetchSubCollection from "../hooks/useFetchSubCollection";
import useFetchComment from "../hooks/useFetchComment";
import useAddAndUpdateCmt from "../hooks/useAddAndUpdateCmt";
import TextareaAutosize from "react-textarea-autosize";
import Skeleton from "../components/loading/Skeleton";
import React, { useState } from "react";
import PostSave from "../modules/post/PostSave";
import PostLike from "../modules/post/PostLike";
import PostInfo from "../modules/post/PostInfo";
import PostCmt from "../modules/post/PostCmt";
import CmtItem from "../modules/comment/CmtItem";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import useQueryCollection from "../hooks/useQueryCollection";
/* ====================================================== */

const TabMeta = [`Comments`, "Creator's videos"];
const PostDetailPage = () => {
  const { id: postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("Comments");
  const { value, setValue, handleChange } = useOnChange();
  const { data: postData, isLoading } = useQuerySnapshot(
    "posts",
    "postId",
    postId
  );
  const { data: cmtData } = useFetchSubCollection("posts", postId, "comments");
  const { comments } = useFetchComment(cmtData);
  const { handleSubmit, isSubmitting } = useAddAndUpdateCmt(
    value,
    setValue,
    postData?.postId,
    currentUser?.userId
  );

  const { data: posts, isLoading: pending } = useQueryCollection(
    "posts",
    "userId",
    postData?.userId
  );
  const relatedPosts = posts.filter((item) => item.postId !== postData?.postId);

  if (!postData || !postId) return null;
  return (
    <section className="flex flex-row h-screen">
      {/* Video container */}
      <div className="relative w-full flex items-center h-screen justify-center max-w-[992px] mx-auto overflow-hidden bg-black">
        {isLoading && (
          <Skeleton className="z-20 w-[422px]  object-contain h-full rounded-sm"></Skeleton>
        )}
        {!isLoading && postData && (
          <video
            controls
            loop
            autoPlay
            src={postData?.video}
            className="z-20 object-contain h-full rounded-sm"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 blur-xl">
          {!isLoading && postData && (
            <video muted src={postData?.video} className="img-cover" />
          )}
        </div>
      </div>

      {/* Content */}
      <section className="flex-1 overflow-y-auto">
        <div className="p-5">
          <PostInfo data={postData} />

          {/* Post action */}
          <section className="flex flex-row gap-5 mt-5">
            <PostLike
              data={postData}
              direction="flex-row "
              className="w-[35px] h-[35px]"
              size={20}
            />
            <PostCmt
              data={postData}
              direction="flex-row "
              className="w-[35px] h-[35px]"
              size={20}
            />
            <PostSave
              data={postData}
              direction="flex-row "
              className="w-[35px] h-[35px]"
              size={18}
            />
          </section>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center px-5 mb-4">
          {TabMeta.map((item) => (
            <span
              onClick={() => setActiveTab(item)}
              className={`${
                activeTab === item
                  ? "text-white border-b border-LightGrey"
                  : "opacity-50 border-b border-transparent"
              } flex items-center justify-center  cursor-pointer transition-all  flex-1 py-2 font-medium`}
              key={item}
            >
              {item === "Comments" ? `Comments (${comments.length})` : item}
            </span>
          ))}
        </div>

        {/* Comment section */}
        {activeTab === "Comments" ? (
          <section className="relative flex flex-col">
            <ul className="flex-1 px-5 py-5 min-h-[500px] flex flex-col gap-6">
              {comments.length > 0 &&
                comments.map((item) => <CmtItem key={v4()} data={item} />)}
            </ul>

            <form
              onSubmit={handleSubmit}
              className="sticky bottom-0 z-10 flex items-center w-full gap-2 p-4 border-t bg-MainDark border-DimeGray"
            >
              <TextareaAutosize
                value={value}
                onChange={handleChange}
                placeholder="Write comments...."
                className="w-full p-3 rounded-lg resize-none bg-CharcoalGray max-h-[118px] h-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />

              <button
                onClick={handleSubmit}
                className={`${
                  value
                    ? "text-Crimson cursor-pointer"
                    : "opacity-50 text-LightGrey cursor-not-allowed"
                } ${
                  isSubmitting
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-not-allowed"
                } flex-shrink-0 text-base font-semibold  w-[40px] h-[40px] flex items-center justify-center`}
              >
                Post
              </button>
            </form>
          </section>
        ) : (
          <React.Fragment>
            {relatedPosts.length === 0 && (
              <div className="w-full mt-20 text-xl font-semibold text-center opacity-80">
                This user only has 1 video
              </div>
            )}

            <section className="grid grid-cols-3 gap-2 p-5">
              {relatedPosts.length > 0 &&
                relatedPosts.map((item) => (
                  <Link to={`/video/${item.postId}`} key={v4()}>
                    <video
                      muted
                      src={item?.video}
                      className="rounded-md img-cover"
                    ></video>
                  </Link>
                ))}
            </section>
          </React.Fragment>
        )}
      </section>

      {/* Back */}
      <Link
        to="/"
        className="fixed flex items-center rounded-full justify-center top-6 left-8 w-[40px] h-[40px] bg-[#3f3f3f] hover:bg-Crimson text-white cursor-pointer"
      >
        <BiArrowBack size={22} />
      </Link>
    </section>
  );
};

export default PostDetailPage;
