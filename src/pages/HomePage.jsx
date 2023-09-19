import React from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import Header from "../components/header/Header";
import Sidebar from "../components/shared/Sidebar";
import { useSelector } from "react-redux";
import VideoTest from "../assets/videos/video-test1.mp4";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { BsFillBookmarkFill, BsThreeDots } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import VideoIcon from "../modules/videos/VideoIcon";
import useFetchCollection from "../hooks/useFetchCollection";
import VideoItem from "../modules/videos/VideoItem";
import { v4 } from "uuid";

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { data: posts, isLoading } = useFetchCollection("posts");

  return (
    <>
      <Header />
      <Sidebar />
      <main className="relative flex flex-col ml-[240px] mt-[64px]">
        <section className="w-full max-w-[692px] py-5 mx-auto flex flex-col gap-8">
          {posts.length > 0 &&
            posts.map((item) => <VideoItem key={v4()} data={item} />)}
        </section>
      </main>
    </>
  );
};

export default HomePage;
