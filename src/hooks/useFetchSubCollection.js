import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../utils/firebase-app";
/* ====================================================== */

export default function useFetchSubCollection(
  collectionName,
  itemId,
  subCollectionName,
  sort = true
) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!itemId) return;

    const colRef = collection(db, collectionName, itemId, subCollectionName);
    const queryRef = query(colRef, orderBy("createdAt", "desc"));
    const queryType = sort ? queryRef : colRef;

    const unsubscribe = onSnapshot(queryType, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data) {
          results.push({
            ...data,
          });
        }
      });

      setData(results);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [collectionName, itemId, subCollectionName]);

  return { data, isLoading };
}
