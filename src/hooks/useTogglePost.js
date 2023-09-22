import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase-app";
import { toast } from "react-toastify";
import { ToastConfig } from "../constants/constants";
/* ====================================================== */

const useTogglePost = (postData, currentUserUID, subCollectionName) => {
  const { postId } = postData;
  const [toggle, setToggle] = useState(false);
  const [amount, setAmount] = useState([]);

  // Fetch the amount of likes
  useEffect(() => {
    if (!postId) return;
    const colRef = collection(db, "posts", postId, subCollectionName);
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
      setAmount(results);
    });
    return () => unsubscribe();
  }, [postId, subCollectionName]);

  // Update status user like or not
  useEffect(() => {
    async function fetchStatus() {
      if (!postId || !currentUserUID) return;
      const queryRef = query(
        collection(db, "posts", postId, subCollectionName),
        where("userId", "==", currentUserUID)
      );
      const querySnapshot = await getDocs(queryRef);
      if (querySnapshot.size > 0) {
        setToggle(true);
      } else {
        setToggle(false);
      }
    }
    fetchStatus();
  }, [currentUserUID, postId, subCollectionName]);

  // Handle user like post
  const handleTogglePost = async () => {
    if (!currentUserUID) {
      toast.info("Please sign in", ToastConfig);
      return;
    }
    if (!postId) return;

    const postLikeDoc = doc(
      db,
      "posts",
      postId,
      subCollectionName,
      currentUserUID
    );
    const userLikeDoc = doc(
      db,
      "users",
      currentUserUID,
      subCollectionName,
      postId
    );

    const [postLikeDocSnap, userLikeDocSnap] = await Promise.all([
      getDoc(postLikeDoc),
      getDoc(userLikeDoc),
    ]);

    const batch = writeBatch(db);
    if (postLikeDocSnap.exists() && userLikeDocSnap.exists()) {
      batch.delete(postLikeDoc);
      batch.delete(userLikeDoc);
      setToggle(false);
    } else {
      batch.set(postLikeDoc, {
        userId: currentUserUID,
      });
      batch.set(userLikeDoc, {
        ...postData,
      });
      setToggle(true);
    }

    await batch.commit();
  };

  return { amount, handleTogglePost, toggle };
};

export default useTogglePost;
