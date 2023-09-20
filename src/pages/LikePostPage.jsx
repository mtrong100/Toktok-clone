import React from "react";
import useFetchSubCollection from "../hooks/useFetchSubCollection";
import { useSelector } from "react-redux";
import PostPreview, { PostPreviewSkeleton } from "../modules/post/PostPreview";
import { v4 } from "uuid";

const LikePostPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { data: posts, isLoading } = useFetchSubCollection(
    "users",
    currentUser?.userId,
    "likes"
  );

  return (
    <React.Fragment>
      {isLoading &&
        Array(5)
          .fill(0)
          .map(() => <PostPreviewSkeleton key={v4()} />)}

      {!isLoading &&
        posts.length > 0 &&
        posts.map((item) => <PostPreview key={v4()} video={item.video} />)}
    </React.Fragment>
  );
};

export default LikePostPage;
