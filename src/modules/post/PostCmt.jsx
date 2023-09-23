import { useSelector } from "react-redux";
import { FaCommentDots } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { ToastConfig } from "../../constants/constants";
import { toast } from "react-toastify";
import useFetchSubCollection from "../../hooks/useFetchSubCollection";
/* ====================================================== */

const PostCmt = ({
  data,
  direction = "flex-col",
  className = "",
  size = 22,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { data: amount } = useFetchSubCollection(
    "posts",
    data?.postId,
    "comments"
  );

  const handleClick = () => {
    if (!currentUser?.userId) {
      toast.info("Please sign in", ToastConfig);
      return;
    } else {
      navigate(`/video/${data?.postId}`);
    }
  };

  return (
    <div className={`${direction} flex items-center justify-center gap-1`}>
      <span
        onClick={handleClick}
        className={twMerge(
          `w-[48px] cursor-pointer hover:bg-MidnightGray flex items-center justify-center h-[48px] bg-CharcoalGray rounded-full`,
          className
        )}
      >
        <FaCommentDots size={size} />
      </span>
      <small className="text-sm font-medium">{amount.length || "0"}</small>
    </div>
  );
};

export default PostCmt;
