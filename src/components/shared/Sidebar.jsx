import UserItem from "../../modules/user/UserItem";
import React from "react";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { SidebarLinks } from "../../constants/constants";
import { NavLink } from "react-router-dom";
/* ====================================================== */

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <section className="w-[240px] fixed top-[64px]  border-r z-20 h-screen border-CharcoalGray bg-MainDark ">
      <ul className="flex flex-col p-2">
        {SidebarLinks.map((item) => (
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
      <div className="mb-3 h-[1px] w-full bg-CharcoalGray"></div>
      <section>
        <h4 className="px-5 text-sm font-medium opacity-80">
          Following accounts
        </h4>
        <ul className="flex flex-col gap-1 mt-2">
          {Array(7)
            .fill(0)
            .map((item, index) => (
              <UserItem key={v4()} />
            ))}
        </ul>
      </section>
    </section>
  );
};

export default Sidebar;
