import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase-app";

export default function useFetchComment(cmtData) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserForComment = async () => {
      if (!cmtData || cmtData.length === 0) return;

      const updatedComments = await Promise.all(
        cmtData.map(async (comment) => {
          setIsLoading(true);
          try {
            const userQueryRef = collection(db, "users");
            const userQuerySnapshot = await getDocs(
              query(userQueryRef, where("userId", "==", comment.userId))
            );

            if (!userQuerySnapshot.empty) {
              const userData = userQuerySnapshot.docs[0].data();
              return { ...comment, user: userData };
            } else {
              return comment;
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            return comment;
          }
        })
      );

      setComments(updatedComments);
      setIsLoading(false);
    };

    fetchUserForComment();
  }, [cmtData]);

  return { comments, isLoading };
}
