import React from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/shared/Sidebar";
import { useSelector } from "react-redux";
import useFetchCollection from "../hooks/useFetchCollection";
import VideoItem, { VideoItemSkeleton } from "../modules/videos/VideoItem";
import { v4 } from "uuid";
/* ====================================================== */

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const { data: posts, isLoading } = useFetchCollection("posts");

  return (
    <React.Fragment>
      {isLoading &&
        Array(4)
          .fill(0)
          .map((item, index) => <VideoItemSkeleton key={index} />)}

      {!isLoading &&
        posts.length > 0 &&
        posts.map((item) => <VideoItem key={v4()} data={item} />)}
    </React.Fragment>
  );
};

export default HomePage;
