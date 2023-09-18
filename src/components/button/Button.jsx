import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  onClick = () => {},
  type = "button",
  className = "",
  isLoading,
  variant = "",
}) => {
  let defaultStyles = "px-4 font-medium cursor-pointer h-[36px] rounded-sm";

  switch (variant) {
    case "solid":
      defaultStyles += " bg-Crimson hover:bg-opacity-80";
      break;
    case "bordered":
      defaultStyles +=
        " border border-Crimson hover:bg-white hover:bg-opacity-10";
      break;
    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isLoading}
      className={twMerge(
        defaultStyles,
        isLoading ? "bg-opacity-50 cursor-not-allowed" : "",
        className
      )}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  variant: PropTypes.oneOf(["solid", "bordered"]),
};

export default Button;
