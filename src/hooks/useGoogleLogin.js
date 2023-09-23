import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase-app";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";
import { ToastConfig } from "../constants/constants";

export default function useGoogleLogin(onClose) {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const googleLogin = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      const data = results.user;
      if (!data || !data.uid) return;

      const userDocRef = doc(db, "users", data.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userDocData = userDocSnapshot.data();
        await updateDoc(userDocRef, {
          username: userDocData.username,
          slug: userDocData.slug,
          photoURL: userDocData.photoURL,
        });
      } else {
        await setDoc(doc(db, "users", data.uid), {
          userId: data.uid,
          username: data.displayName,
          slug: slugify(data.displayName, { lower: true }),
          email: data.email,
          photoURL: data.photoURL,
          createdAt: serverTimestamp(),
        });
      }

      onClose();
      navigate("/");
      toast.success("Welcome to tiktok!", ToastConfig);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return { googleLogin };
}
