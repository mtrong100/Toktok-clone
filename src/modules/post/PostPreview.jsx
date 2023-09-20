import React from "react";
import Skeleton from "../../components/loading/Skeleton";

const PostPreview = ({ video }) => {
  return (
    <div className="cursor-pointer bg-primaryGradient">
      <video
        controls
        loop
        muted
        src={video}
        className="w-full h-full rounded-md"
      />
    </div>
  );
};

export default PostPreview;

export const PostPreviewSkeleton = () => {
  return <Skeleton className="rounded-md h-[415px]"></Skeleton>;
};
