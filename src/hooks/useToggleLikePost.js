import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase-app";
/* ====================================================== */

const useToggleLikePost = (postData, currentUserUID) => {
  const { postId } = postData;
  const [isLiked, setIsLiked] = useState(false);
  const [likeAmount, setLikeamount] = useState([]);

  // Fetch the amount of likes
  useEffect(() => {
    if (!postId) return;
    const colRef = collection(db, "posts", postId, "likes");

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data) {
          results.push({
            ...data,
          });
        }
      });
      setLikeamount(results);
    });

    return () => unsubscribe();
  }, [postId]);

  // Update status user like or not
  useEffect(() => {
    async function fetchStatus() {
      if (!postId || !currentUserUID) return;
      const queryRef = query(
        collection(db, "posts", postId, "likes"),
        where("likedId", "==", currentUserUID)
      );
      const querySnapshot = await getDocs(queryRef);
      if (querySnapshot.size > 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
    fetchStatus();
  }, [currentUserUID, isLiked, postId]);

  // Handle user like post
  const handleLikePost = async () => {
    if (!currentUserUID || !postId) return;
    const likeDocRef = doc(db, "posts", postId, "likes", currentUserUID);
    const likeDocSnap = await getDoc(likeDocRef);

    if (likeDocSnap.exists()) {
      await deleteDoc(likeDocRef);
      setIsLiked(false);
    } else {
      await setDoc(likeDocRef, {
        likedId: currentUserUID,
        ...postData,
      });
      setIsLiked(true);
    }
  };

  return { likeAmount, handleLikePost, isLiked };
};

export default useToggleLikePost;
