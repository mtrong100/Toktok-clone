import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineSetting } from "react-icons/ai";
import { BiLogOut, BiUser } from "react-icons/bi";
import { MdOutlineContactSupport } from "react-icons/md";
import { Fragment } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase-app";
import { useSelector } from "react-redux";
import UserAvatar from "../../modules/user/UserAvatar";
import { Link } from "react-router-dom";
/* ====================================================== */

const MenuDropdown = () => {
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = () => {
    signOut(auth);
    window.location.reload();
  };

  const links = [
    { label: "Profile", icon: <BiUser />, path: `${currentUser?.slug}` },
    { label: "Settings", icon: <AiOutlineSetting /> },
    {
      label: "Support",
      icon: <MdOutlineContactSupport />,
    },
    { label: "Sign out", icon: <BiLogOut />, onClick: handleSignout },
  ];

  return (
    <Menu as="div">
      <Menu.Button>
        <UserAvatar size="lg" avatar={currentUser?.photoURL} />
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
          {links.map((link) => {
            if (link.path) {
              return (
                <Menu.Item key={link.label} as={Fragment}>
                  {({ active }) => (
                    <Link
                      to={link.path}
                      onClick={link.onClick}
                      href={link.href}
                      className={`${
                        active ? "bg-white bg-opacity-10" : ""
                      } flex items-center gap-2 h-[40px] px-3 cursor-pointer`}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  )}
                </Menu.Item>
              );
            }

            return (
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
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuDropdown;
