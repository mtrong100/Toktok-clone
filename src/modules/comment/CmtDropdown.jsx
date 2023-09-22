import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineFlag } from "react-icons/ai";
import { BiDotsHorizontal } from "react-icons/bi";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsUpdate, storeCommentData } from "../../redux/features/postSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase-app";
/* ====================================================== */

const CmtDropdown = ({ data }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const deleteComment = async () => {
    try {
      const cmtDoc = doc(
        db,
        "posts",
        data?.postId,
        "comments",
        data?.commentId
      );
      await deleteDoc(cmtDoc);
    } catch (error) {
      console.log(error);
    }
  };

  const links = [
    {
      label: "Edit",
      icon: <AiOutlineEdit />,
      onClick: () => {
        dispatch(setIsUpdate(true));
        dispatch(storeCommentData(data));
      },
    },
    { label: "Delete", icon: <AiOutlineDelete />, onClick: deleteComment },
    { label: "Report", icon: <AiOutlineFlag /> },
  ];

  return (
    <Menu as="div">
      <Menu.Button>
        {currentUser?.userId === data?.user?.userId && (
          <div className="w-[35px] h-[35px] flex items-center justify-center bg-DarkGray hover:bg-DimeGray text-white rounded-full cursor-pointer">
            <BiDotsHorizontal size={22} />
          </div>
        )}
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
        <Menu.Items className="absolute min-w-[140px] right-10 origin-bottom bg-DarkGray rounded-md shadow-lg top-20 dark:text-white dark:bg-DarkGray">
          {links.map((link) => {
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

export default CmtDropdown;
