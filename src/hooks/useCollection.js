import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';

// this hook is used to fetch data from firebase
export const useCollection = (_collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query and _orderBy are arrays and is "different" on every function call
  // that's why we need to use the useRef hook, to make the data "static"
  const q = useRef(_query).current;
  const ob = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, _collection);

    if (q) {
      ref = query(ref, where(...q));
    }

    if (ob) {
      ref = query(ref, orderBy(...ob));
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError('Could not fetch the data...');
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [_collection, q, ob]);

  return { documents, error };
};
