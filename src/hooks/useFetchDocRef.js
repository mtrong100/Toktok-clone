import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase-app";

export default function useFetchDocRef(collectionName, fieldValue) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const postDoc = doc(db, collectionName, fieldValue);
      const docSnapshot = await getDoc(postDoc);

      if (docSnapshot.exists()) {
        setData(docSnapshot.data());
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [collectionName, fieldValue]);

  return { data, isLoading };
}
