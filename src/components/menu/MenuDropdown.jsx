import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineSetting } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineContactSupport } from "react-icons/md";
import { Fragment } from "react";
import { AiOutlineBars } from "react-icons/ai";
// import { useTheme } from "../../context/theme-context";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase-app";
import { useSelector } from "react-redux";
import DefaultAvatar from "/user.png";

const MenuDropdown = () => {
  const { currentUser } = useSelector((state) => state.user);
  //   const { darkMode, toggleDarkMode } = useTheme();

  const handleSignout = () => {
    signOut(auth);
    window.location.reload();
  };

  const links = [
    { label: "Settings", icon: <AiOutlineSetting /> },
    // {
    //   label: "Theme",
    //   icon: darkMode ? <FaMoon /> : <BsSun />,
    //   onClick: toggleDarkMode,
    // },
    {
      label: "Support",
      icon: <MdOutlineContactSupport />,
    },
    { label: "Sign out", icon: <BiLogOut />, onClick: handleSignout },
  ];

  return (
    <Menu as="div">
      <Menu.Button>
        <div className="w-[40px] h-[40px] cursor-pointer relative">
          <img
            src={currentUser?.photoURL || DefaultAvatar}
            alt="user-avatar"
            className="rounded-full img-cover"
          />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute min-w-[160px] right-10 origin-bottom bg-DarkGray rounded-md shadow-lg top-16 dark:text-white dark:bg-DarkGray">
          {links.map((link) => (
            <Menu.Item key={link.label} as={Fragment}>
              {({ active }) => (
                <li
                  onClick={link.onClick}
                  href={link.href}
                  className={`${
                    active ? "bg-white bg-opacity-10" : ""
                  } flex items-center gap-2 h-[40px] px-3 cursor-pointer`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </li>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuDropdown;
