import React from "react";
import useFetchCollection from "../hooks/useFetchCollection";
import { v4 } from "uuid";
import { AiOutlineHeart } from "react-icons/ai";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import UserAvatar from "../modules/user/UserAvatar";
import useFetchSubCollection from "../hooks/useFetchSubCollection";
import ButtonScrollTop from "../components/button/ButtonScrollTop";
/* ====================================================== */

const ExplorePage = () => {
  const { data, isLoading } = useFetchCollection("posts");

  return (
    <section className="grid grid-cols-4 gap-x-5 gap-y-8">
      {!isLoading &&
        data.length > 0 &&
        data.map((item) => <ExplorePostItem key={v4()} data={item} />)}
      <ButtonScrollTop />
    </section>
  );
};

export default ExplorePage;

const ExplorePostItem = ({ data }) => {
  const { data: user } = useQuerySnapshot("users", "userId", data?.userId);
  const { data: amount } = useFetchSubCollection(
    "posts",
    data?.postId,
    "likes"
  );

  return (
    <article>
      <video controls loop muted src={data?.video} className="rounded-lg" />
      <div className="flex flex-col gap-3 p-2">
        <p>{data?.title}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserAvatar avatar={user?.photoURL} size="sm" />
            <span className="font-medium">{user?.username}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold opacity-70">
            <span>
              <AiOutlineHeart size={20} />
            </span>
            <span>{amount.length || "0"}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
