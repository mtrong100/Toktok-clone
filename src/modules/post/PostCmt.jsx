import { useSelector } from "react-redux";
import { FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
/* ====================================================== */

const PostCmt = ({
  data,
  direction = "flex-col",
  className = "",
  size = 22,
}) => {
  return (
    <div className={`${direction} flex items-center justify-center gap-1`}>
      <Link
        to={`/video/${data?.postId}`}
        className={twMerge(
          `w-[48px] cursor-pointer hover:bg-MidnightGray flex items-center justify-center h-[48px] bg-CharcoalGray rounded-full`,
          className
        )}
      >
        <FaCommentDots size={size} />
      </Link>
      <small className="text-sm font-medium">{"1450"}</small>
    </div>
  );
};

export default PostCmt;
