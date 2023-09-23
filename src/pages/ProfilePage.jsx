import React, { useEffect, useState } from "react";
import UserAvatar from "../modules/user/UserAvatar";
import Button from "../components/button/Button";
import { BiEdit, BiSolidLockAlt } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import useQueryCollection from "../hooks/useQueryCollection";
import PostPreview, { PostPreviewSkeleton } from "../modules/post/PostPreview";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import UpdateProfileModal from "../components/modal/UpdateProfileModal";
import useToggleValue from "../hooks/useToggleValue";
/* ====================================================== */

const ProfilePage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [selected, setSelected] = useState("Videos");
  const { toggle: showModal, handleToggle } = useToggleValue();
  const { data: user } = useQuerySnapshot("users", "slug", slug);
  const { data: posts, isLoading } = useQueryCollection(
    "posts",
    "userId",
    user?.userId
  );

  const TabHeader = [
    {
      title: "Videos",
      path: `/${slug}`,
    },
    {
      title: "Favorites",
      icon: <BiSolidLockAlt />,
      path: `/${slug}/favorites`,
    },
    {
      title: "Saves",
      icon: <BiSolidLockAlt />,
      path: `/${slug}/saves`,
    },
  ];

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <React.Fragment>
      <div className="flex items-center gap-5">
        <UserAvatar avatar={user?.photoURL} size="xxl" />
        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-bold">{user?.username}</h1>
          <span className="text-lg font-medium">@{user?.slug}</span>
          <div className="flex items-center gap-4">
            {currentUser?.userId === user?.userId && (
              <Button
                onClick={handleToggle}
                variant="bordered"
                className="flex items-center gap-2 text-white border-transparent hover:border-DimeGray bg-CharcoalGray"
              >
                <span>
                  <BiEdit size={18} />
                </span>
                Edit profile
              </Button>
            )}
            <span className="cursor-pointer">
              <IoIosShareAlt size={25} />
            </span>
          </div>
        </div>
      </div>

      <ProfileMeta />
      <p className="w-full max-w-lg text-sm">{user?.bio || ""}</p>
      <TabIndicator
        TabHeader={TabHeader}
        setSelected={setSelected}
        selected={selected}
      />

      <main className="mt-5">
        <ul className="grid grid-cols-5 gap-2">
          {location.pathname === `/${slug}` && (
            <React.Fragment>
              {isLoading &&
                Array(5)
                  .fill(0)
                  .map(() => <PostPreviewSkeleton key={v4()} />)}

              {!isLoading &&
                posts.length > 0 &&
                posts.map((item) => (
                  <PostPreview key={v4()} video={item.video} />
                ))}
            </React.Fragment>
          )}

          <Outlet />
        </ul>
      </main>

      <UpdateProfileModal isOpen={showModal} onClose={handleToggle} />
    </React.Fragment>
  );
};

export default ProfilePage;

function ProfileMeta() {
  return (
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
  );
}

function TabIndicator({ TabHeader = [], setSelected, selected }) {
  return (
    <section className="flex items-center my-5">
      {TabHeader.map((item) => (
        <Link
          to={item.path}
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
        </Link>
      ))}
    </section>
  );
}
