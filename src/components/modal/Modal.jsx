import ReactDOM from "react-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleEventModal } from "../../redux/slices/blogSlice";
/* <===============================================================> */

const Modal = ({ children }) => {
  //   const dispatch = useDispatch();
  //   const { eventModal } = useSelector((state) => state.blog);

  return ReactDOM.createPortal(
    <div
    //   className={`${
    //     eventModal ? "opacity-100 scale-100" : "opacity-0 scale-0"
    //   } transition-all fixed flex items-center inset-0 z-[99] duration-300 justify-center h-screen`}
    >
      <div
        // onClick={() => dispatch(toggleEventModal(true))}
        className="absolute inset-0 bg-black bg-opacity-50"
      ></div>
      {children}
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
