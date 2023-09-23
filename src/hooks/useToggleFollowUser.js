import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebase-app";
import { toast } from "react-toastify";
import { ToastConfig } from "../constants/constants";
/* ====================================================== */

export default function useToggleFollowUser(currentUID, userId) {
  const navigate = useNavigate();

  // Toggle follow a user
  const handleToggleFollow = async () => {
    if (!currentUID || !userId) {
      toast.info("Please sign in!", ToastConfig);
      navigate("/");
      return;
    }

    try {
      const followingDocRef = doc(db, "users", currentUID, "following", userId);
      const followingDocSnap = await getDoc(followingDocRef);
      if (followingDocSnap.exists()) {
        await unfollowUser(userId, currentUID);
      } else {
        await followUser(userId, currentUID);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle follow a user
  const followUser = async (uid, currentUID) => {
    const followingDocRef = doc(db, "users", currentUID, "following", uid);
    const followersDocRef = doc(db, "users", uid, "followers", currentUID);
    await Promise.all([
      setDoc(followingDocRef, {
        userId: uid,
        createdAt: serverTimestamp(),
      }),
      setDoc(followersDocRef, {
        userId: currentUID,
        createdAt: serverTimestamp(),
      }),
    ]);
  };

  // Handle unfollow a user
  const unfollowUser = async (uid, currentUID) => {
    const followingDocRef = doc(db, "users", currentUID, "following", uid);
    const followersDocRef = doc(db, "users", uid, "followers", currentUID);
    await Promise.all([deleteDoc(followingDocRef), deleteDoc(followersDocRef)]);
  };

  return { handleToggleFollow };
}
