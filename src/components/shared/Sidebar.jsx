import React from "react";
import { SidebarLinks } from "../../constants/constants";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <section className="w-[240px] fixed top-[64px]  border-r z-20 h-screen border-CharcoalGray bg-MainDark ">
      <ul className="flex flex-col gap-1 p-2">
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

      <div className="mb-3 h-[1px] w-full bg-CharcoalGray "></div>

      <div>
        <h4 className="px-5 text-sm font-medium opacity-80">
          Following accounts
        </h4>
        <ul className="flex flex-col gap-1 mt-2">
          {Array(7)
            .fill(0)
            .map((item, index) => (
              <li
                key={index}
                className="h-[48px] px-5  flex items-center cursor-pointer font-semibold hover:bg-CharcoalGray transition-all rounded-sm gap-3 text-lg"
              >
                <div className="w-[32px] h-[32px]">
                  <img
                    className="rounded-full img-cover"
                    src="https://source.unsplash.com/random"
                    alt="user-account"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">
                    {currentUser?.username}
                  </h3>
                  <p className="text-xs opacity-80">{currentUser?.slug}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
