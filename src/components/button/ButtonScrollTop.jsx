import React, { useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";

const ButtonScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the website
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
    });
  };

  // Function to show/hide the button based on scroll position
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add a scroll event listener to check scroll position
  window.addEventListener("scroll", handleScroll);

  return (
    <button
      className={`rounded-full fixed bottom-10 shadow-lg z-20 hover:bg-opacity-80 right-10 w-[45px] h-[45px] items-center justify-center bg-Crimson ${
        isVisible ? "flex" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      <BiUpArrowAlt size={25} />
    </button>
  );
};

export default ButtonScrollTop;
