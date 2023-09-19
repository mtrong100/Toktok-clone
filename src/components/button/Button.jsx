import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
/* ====================================================== */

const defaultStyles = "px-4 font-medium cursor-pointer h-[36px] rounded-sm";
const variantClasses = {
  solid: "bg-Crimson hover:bg-opacity-80",
  bordered: "border border-Crimson hover:bg-white hover:bg-opacity-10",
};

const Button = ({
  children,
  onClick = () => {},
  type = "button",
  className = "",
  variant = "primary",
  isLoading = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isLoading}
      className={twMerge(
        "px-4 font-medium cursor-pointer h-[36px] rounded-sm",
        variantClasses[variant],
        className,
        isLoading ? "bg-opacity-50 cursor-not-allowed" : ""
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
