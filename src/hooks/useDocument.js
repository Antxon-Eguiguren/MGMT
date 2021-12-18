import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

export const useDocument = (c, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const ref = doc(db, `${c}/${id}`);
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError('No such document with that id...');
        }
        setIsPending(false);
      },
      (err) => {
        console.log(err);
        setError(err.message);
        setIsPending(false);
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [c, id]);

  return { document, error, isPending };
};
