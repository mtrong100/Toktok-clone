import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const ButtonBack = ({ className = "" }) => {
  return (
    <Link
      to="/"
      className={twMerge(
        "fixed flex items-center rounded-full justify-center top-6 left-8 xl:w-[40px] xl:h-[40px] bg-[#3f3f3f] hover:bg-Crimson text-white cursor-pointer text-3xl xl:text-xl",
        className
      )}
    >
      <BiArrowBack />
    </Link>
  );
};

export default ButtonBack;
