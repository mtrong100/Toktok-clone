import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase-app";
import { useState } from "react";

export default function useAddCmt(value, reset, fieldValue, userId) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddCmt = async () => {
    if (!value.trim()) return;
    setIsSubmitting(true);

    try {
      const cmtRef = collection(db, "posts", fieldValue, "comments");
      await addDoc(cmtRef, {
        content: value,
        userId,
        createdAt: serverTimestamp(),
      });

      reset("");
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleAddCmt, isSubmitting };
}
