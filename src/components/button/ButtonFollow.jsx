import React from "react";
import Button from "./Button";
import useFetchSubCollection from "../../hooks/useFetchSubCollection";
import { useSelector } from "react-redux";
import useToggleFollowUser from "../../hooks/useToggleFollowUser";
/* ====================================================== */

const ButtonFollow = ({ uid }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { data: followingList } = useFetchSubCollection(
    "users",
    currentUser?.userId,
    "following"
  );
  const { handleToggleFollow } = useToggleFollowUser(currentUser?.userId, uid);

  return (
    <>
      {followingList.some((item) => item.userId === uid) ? (
        <Button
          onClick={handleToggleFollow}
          className="h-[36px] px-5"
          variant="secondary"
        >
          Following
        </Button>
      ) : (
        <Button
          onClick={handleToggleFollow}
          className="h-[36px] px-5"
          variant="bordered"
        >
          Follow
        </Button>
      )}
    </>
  );
};

export default ButtonFollow;
