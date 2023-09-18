import React from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import Header from "../components/header/Header";
import Sidebar from "../components/shared/Sidebar";
import { useSelector } from "react-redux";
import VideoTest from "../assets/videos/video-test1.mp4";

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <Sidebar />
      <main className="relative flex flex-col ml-[240px] mt-[64px]">
        <section className="w-full max-w-[692px] py-5 mx-auto flex flex-col gap-8">
          {Array(5)
            .fill(0)
            .map((item, index) => (
              <article key={index} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-[53px] h-[53px] flex-shrink-0">
                      <img
                        src={currentUser?.photoURL}
                        className="rounded-full img-cover"
                        alt="user-avatar"
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold cursor-pointer hover:underline">
                        {currentUser?.username}
                      </h4>
                      <p className="w-full max-w-sm mt-1 text-sm leading-snug">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Dignissimos dolorum quod
                      </p>
                    </div>
                  </div>

                  <button className="h-[36px] px-5 border flex items-center justify-center rounded-sm cursor-pointer font-medium border-Crimson text-Crimson hover:bg-CharcoalGray">
                    Follow
                  </button>
                </div>

                <div className="ml-[62px]">
                  <video
                    controls
                    loop
                    autoPlay
                    muted
                    src={VideoTest}
                    className=" max-h-[600px] rounded-md mt-2"
                  />
                </div>
              </article>
            ))}
        </section>
      </main>
    </>
  );
};

export default HomePage;
