import React, { useEffect, useState } from "react";
import useFetchSubCollection from "../hooks/useFetchSubCollection";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase-app";
import PostItem, { PostItemItemSkeleton } from "../modules/post/PostItem";
import { v4 } from "uuid";

const FollowingPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: following } = useFetchSubCollection(
    "users",
    currentUser?.userId,
    "following"
  );

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      if (!following || following.length === 0) return;

      const followingPosts = await Promise.all(
        following.map(async (item) => {
          setIsLoading(true);
          try {
            const userQueryRef = collection(db, "posts");
            const userQuerySnapshot = await getDocs(
              query(userQueryRef, where("userId", "==", item.userId))
            );

            if (!userQuerySnapshot.empty) {
              const userData = userQuerySnapshot.docs[0].data();
              return { ...userData };
            } else {
              return;
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            return item;
          }
        })
      );

      setPosts(followingPosts);
      setIsLoading(false);
    };
    fetchFollowingPosts();
  }, [following]);

  return (
    <React.Fragment>
      {isLoading &&
        Array(4)
          .fill(0)
          .map(() => <PostItemItemSkeleton key={v4()} />)}

      {!isLoading &&
        posts.length > 0 &&
        posts.map((item) => <PostItem key={v4()} data={item} />)}
    </React.Fragment>
  );
};

export default FollowingPage;
