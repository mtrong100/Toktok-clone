import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";
import UserAvatar from "../../modules/user/UserAvatar";
import { UploadSidebar } from "../../constants/constants";
import ButtonScrollTop from "../button/ButtonScrollTop";

const CreatorLayout = () => {
  return (
    <section>
      <Header />
      <Sidebar />
      <main className="relative flex flex-col lg:ml-[240px] pt-[150px] lg:pt-[100px] xl:px-0 px-6">
        <Outlet />
      </main>
      <ButtonScrollTop />
    </section>
  );
};

export default CreatorLayout;

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="h-[60px] bg-MainDark fixed top-0 w-full px-5 border-b justify-between border-CharcoalGray z-50 flex items-center">
      <section className="flex items-center gap-3">
        <Link to="/" className="w-[42px] h-[42px] flex items-center gap-2">
          <img src="/logo.png" className="img-cover" alt="tiktok-logo" />
          <h1 className="text-2xl font-semibold text-white">Tiktok</h1>
        </Link>
        <div className="flex items-center gap-3 ml-20">
          <span className="px-[9px] py-1 bg-black text-white font-semibold rounded-sm">
            Creator Center
          </span>
          <span className="px-3 py-1 font-semibold text-white rounded-sm bg-Crimson">
            Beta
          </span>
        </div>
      </section>
      <UserAvatar size="md" avatar={currentUser?.photoURL} />
    </header>
  );
}

function Sidebar() {
  return (
    <section className="w-[240px] fixed lg:block hidden left-0 top-[60px] h-screen p-3 border-r border-CharcoalGray">
      <ul className="flex flex-col">
        {UploadSidebar.map((item) => (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `${
                isActive ? "text-Crimson" : "text-LightGrey"
              }  flex px-5 items-center cursor-pointer font-semibold hover:bg-CharcoalGray transition-all rounded-sm gap-4 h-[48px] text-lg`
            }
            key={item.name}
          >
            <span className="text-2xl">{item.icon}</span>
            <p>{item.name}</p>
          </NavLink>
        ))}
      </ul>
    </section>
  );
}
