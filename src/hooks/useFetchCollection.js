import { useState, useEffect } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../utils/firebase-app";
/* ====================================================== */

export default function useFetchCollection(collectionName, limitData = false) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, collectionName);

    const queryLimit = query(colRef, orderBy("createdAt", "desc"), limit(7));
    const queryRef = query(colRef, orderBy("createdAt", "desc"));
    const queryType = limitData ? queryLimit : queryRef;

    const unsubscribe = onSnapshot(queryType, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          ...doc.data(),
        });
      });
      setData(results);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [collectionName]);

  return { data, isLoading };
}
