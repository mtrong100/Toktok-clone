import UserItem from "../../modules/user/UserItem";
import useFetchCollection from "../../hooks/useFetchCollection";
import React from "react";
import { v4 } from "uuid";
import { SidebarLinks } from "../../constants/constants";
import { NavLink } from "react-router-dom";
/* ====================================================== */

const Sidebar = () => {
  const { data } = useFetchCollection("users", true);

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
          {data.length > 0 &&
            data.map((item) => <UserItem key={v4()} data={item} />)}
        </ul>
      </section>
    </section>
  );
};

export default Sidebar;
