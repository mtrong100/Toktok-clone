import useToggleValue from "../../hooks/useToggleValue";
import React from "react";
import Modal from "../modal/Modal";
import Button from "../button/Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { BiMessageAltMinus, BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import MenuDropdown from "../menu/MenuDropdown";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const { toggle: showModal, handleToggle } = useToggleValue();

  return (
    <React.Fragment>
      <header className="fixed top-0 z-50 grid items-center w-full grid-cols-3 px-8 py-2 border-b bg-MainDark border-DarkGray">
        <div className="w-[42px] h-[42px] flex items-center gap-2">
          <img src="/logo.png" className="img-cover" alt="tiktok-logo" />
          <h1 className="text-2xl font-semibold">Tiktok</h1>
        </div>

        <div className="flex items-center justify-between w-full py-3 px-4 max-w-[500px] bg-DarkGray gap-1 border border-transparent rounded-full group hover:border-DimeGray">
          <input
            type="text"
            placeholder="Search..."
            className="w-full caret-Crimson"
          />
          <span className="pl-2 border-l border-DimeGray">
            <BiSearch size={20} />
          </span>
        </div>

        <div className="flex items-center justify-end gap-5">
          <Link className="flex items-center justify-center gap-1 px-4 h-[36px] font-semibold border border-transparent rounded-sm bg-DarkGray hover:border-DimeGray">
            <span>
              <AiOutlinePlus />
            </span>
            Upload
          </Link>

          {currentUser ? (
            <MenuDropdown />
          ) : (
            <Button onClick={handleToggle} variant="solid">
              Join now
            </Button>
          )}
        </div>
      </header>
      <Modal isOpen={showModal} onClose={handleToggle} />
    </React.Fragment>
  );
};

export default Header;
