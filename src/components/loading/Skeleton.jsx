import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={twMerge("animate-pulse rounded-sm bg-CharcoalGray", className)}
    ></div>
  );
};

/* Add PropsTypes */
Skeleton.propTypes = {
  className: PropTypes.string,
};
export default Skeleton;
