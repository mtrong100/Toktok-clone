import { AiFillHome, AiOutlineUnorderedList } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { MdExplore, MdOutlineUploadFile } from "react-icons/md";

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
];

export const TiktokLinks = [
  "About",
  "Contact",
  "Careers",
  "Advertise",
  "Embeds",
  "Terms & Privacy",
  "Community & Guidelines",
  "Creator",
];

export const ToastConfig = {
  position: "top-center",
  theme: "dark",
  autoClose: 2000,
  pauseOnHover: false,
};

export const UploadSidebar = [
  {
    name: "Home",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    name: "Upload",
    path: "/creator/upload",
    icon: <MdOutlineUploadFile />,
  },
  {
    name: "Posts",
    path: "/creator/manage",
    icon: <AiOutlineUnorderedList />,
  },
];

export const WatchOptions = ["Public", "Friends", "Private"];
export const TableTitle = ["Posts", "Actions", "Date", "Status"];
