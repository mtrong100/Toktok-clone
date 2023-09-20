import React, { useEffect, useState } from "react";
import UserAvatar from "../modules/user/UserAvatar";
import Button from "../components/button/Button";
import { BiEdit, BiSolidLockAlt } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { useParams } from "react-router-dom";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
/* ====================================================== */

const ProfilePage = () => {
  const { slug } = useParams();
  const [selected, setSelected] = useState("Videos");
  const { data: user } = useQuerySnapshot("users", "slug", slug);

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const TabHeader = [
    {
      title: "Videos",
    },
    {
      title: "Favorites",
      icon: <BiSolidLockAlt />,
      path: "/favorites",
    },
    {
      title: "Liked",
      icon: <BiSolidLockAlt />,
      path: "/liked",
    },
  ];

  return (
    <section>
      <div className="flex items-center gap-5">
        <UserAvatar avatar={user?.photoURL} size="xxl" />
        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-bold">{user?.username}</h1>
          <span className="text-lg font-medium">@{user?.slug}</span>
          <div className="flex items-center gap-4">
            <Button
              variant="bordered"
              className="flex items-center gap-2 border-transparent hover:border-DimeGray bg-CharcoalGray"
            >
              <span>
                <BiEdit size={18} />
              </span>
              Edit profile
            </Button>

            <span className="cursor-pointer">
              <IoIosShareAlt size={25} />
            </span>
          </div>
        </div>
      </div>

      <section className="flex items-center gap-5 mt-8 mb-2">
        <div className="flex items-center gap-1">
          <span className="font-semibold">11</span>
          Following
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">133</span>
          Followers
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">2561</span>
          Likes
        </div>
      </section>

      <p className="w-full max-w-lg text-sm">
        "Lorem ipsum dolor sit amet consectetur adipisicing elit."
      </p>

      <section className="flex items-center my-5">
        {TabHeader.map((item) => (
          <div
            onClick={() => setSelected(item.title)}
            className={`${
              selected === item.title
                ? "font-semibold  border-b-2"
                : "font-normal border-b-2 border-transparent"
            } w-[122px] h-[44px] flex items-center rounded-sm hover:bg-DarkGray transition-all cursor-pointer gap-1 justify-center`}
            key={item.title}
          >
            <span>{item.icon}</span>
            {item.title}
          </div>
        ))}
      </section>
    </section>
  );
};

export default ProfilePage;
