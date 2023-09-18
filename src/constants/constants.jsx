import { AiFillHome, AiFillVideoCamera } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { MdExplore } from "react-icons/md";

export const SidebarLinks = [
  {
    name: "For you",
    icon: <AiFillHome />,
    path: "/",
  },
  {
    name: "Following",
    icon: <FaUserFriends />,
    path: "/following",
  },
  {
    name: "Explore",
    icon: <MdExplore />,
    path: "/explore",
  },
  {
    name: "Live",
    icon: <AiFillVideoCamera />,
    path: "/",
  },
];
