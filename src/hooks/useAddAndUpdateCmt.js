import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase-app";
import { useDispatch, useSelector } from "react-redux";
import { setIsUpdate } from "../redux/features/postSlice";
import { toast } from "react-toastify";
import { ToastConfig } from "../constants/constants";
/* ====================================================== */

export default function useAddAndUpdateCmt(value, setValue, postId, userId) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isUpdate, commentData } = useSelector((state) => state.post);

  /* Submit comments */
  const handleSubmit = () => {
    if (!currentUser?.email) {
      toast.info("Please sign in!", ToastConfig);
      return;
    } else {
      if (isUpdate) {
        handleUpdateCmt();
      } else {
        handleAddCmt();
      }
    }
  };

  /* Reset */
  useEffect(() => {
    if (isUpdate) {
      setValue(commentData.comment);
    }
  }, [commentData.comment, isUpdate, setValue]);

  /* Add new comments */
  const handleAddCmt = async () => {
    if (!value.trim()) return;
    setIsSubmitting(true);

    try {
      const cmtRef = collection(db, "posts", postId, "comments");
      const cmtDoc = await addDoc(cmtRef, {
        comment: value,
        userId: userId,
        postId: postId,
        createdAt: serverTimestamp(),
      });

      await updateDoc(cmtDoc, {
        commentId: cmtDoc.id,
      });

      setValue("");
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setValue("");
    }
  };

  /* Update comment */
  const handleUpdateCmt = async () => {
    if (!value.trim()) return;
    setIsSubmitting(true);

    try {
      const cmtDoc = doc(
        db,
        "posts",
        postId,
        "comments",
        commentData.commentId
      );
      await updateDoc(cmtDoc, {
        comment: value,
      });

      setValue("");
      dispatch(setIsUpdate(false));
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleSubmit, isSubmitting };
}
