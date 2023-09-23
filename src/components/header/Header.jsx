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
import useOnChange from "../../hooks/useOnChange";
import useFetchCollection from "../../hooks/useFetchCollection";
import { v4 } from "uuid";
import UserAvatar from "../../modules/user/UserAvatar";
/* ====================================================== */

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { toggle: showModal, handleToggle } = useToggleValue();

  return (
    <React.Fragment>
      <header className="fixed top-0 z-20 grid items-center w-full grid-cols-3 px-8 py-2 border-b bg-MainDark border-DarkGray">
        <Link to="/" className="w-[42px] h-[42px] flex items-center gap-2">
          <img src="/logo.png" className="img-cover" alt="tiktok-logo" />
          <h1 className="text-2xl font-semibold">Tiktok</h1>
        </Link>
        <SearchBox />
        <div className="flex items-center justify-end gap-5">
          {currentUser && (
            <Link
              to={`/creator/upload`}
              className="flex items-center justify-center gap-1 px-4 h-[36px] font-semibold border border-transparent rounded-sm bg-DarkGray hover:border-DimeGray"
            >
              <span>
                <AiOutlinePlus />
              </span>
              Upload
            </Link>
          )}

          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-2xl cursor-pointer">
                <IoMdNotifications />
              </span>
              <span className="text-2xl cursor-pointer">
                <BiMessageAltMinus />
              </span>
              <MenuDropdown />
            </div>
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

function SearchBox() {
  const { value, handleChange } = useOnChange();
  const { data } = useFetchCollection("users");

  // Search user
  const filteredUser = data.filter((item) =>
    item.username.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="py-3 px-4 relative max-w-[500px] bg-DarkGray gap-1 border border-transparent rounded-full group hover:border-DimeGray">
      <div className="flex items-center justify-between w-full">
        <input
          value={value}
          onChange={handleChange}
          type="text"
          placeholder="Search..."
          className="w-full caret-Crimson"
        />
        <span className="pl-2 border-l border-DimeGray">
          <BiSearch size={20} />
        </span>
      </div>

      {value && (
        <ul className="max-w-[500px] flex flex-col z-10 gap-3 py-2 bg-DarkGray  left-0 rounded-md w-full top-[50px] absolute">
          {filteredUser.length === 0 && (
            <p className="p-3 font-medium text-center">Not found...</p>
          )}

          {filteredUser.length > 0 &&
            filteredUser.map((item) => (
              <Link
                key={v4()}
                to={`${item?.slug}`}
                className="h-[48px] flex px-5 items-center cursor-pointer font-semibold hover:bg-DimeGray transition-all rounded-sm gap-3 text-lg"
              >
                <UserAvatar size="lg" avatar={item?.photoURL} />
                <div>
                  <h3 className="text-sm font-semibold">{item?.username}</h3>
                  <p className="text-xs opacity-80">{`@${item?.slug}`}</p>
                </div>
              </Link>
            ))}
        </ul>
      )}
    </div>
  );
}
