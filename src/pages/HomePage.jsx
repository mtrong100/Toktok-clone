import useFetchCollection from "../hooks/useFetchCollection";
import React, { useEffect } from "react";
import PostItem, { PostItemItemSkeleton } from "../modules/post/PostItem";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
/* ====================================================== */

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  const { data: posts, isLoading } = useFetchCollection("posts");

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <React.Fragment>
      {isLoading &&
        Array(4)
          .fill(0)
          .map(() => <PostItemItemSkeleton key={v4()} />)}

      {!isLoading &&
        posts.length > 0 &&
        posts.map((item) => <PostItem key={v4()} data={item} />)}
    </React.Fragment>
  );
};

export default HomePage;
