import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

// this hook is used to logout in firebase
export const useLogout = () => {
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  // only dispatch if not unmounted
  const dispatchIfNotUnmounted = (action) => {
    if (!isUnmounted) {
      dispatch(action);
    }
  };

  const logout = async () => {
    setIsPending(true);

    try {
      // update isOnline status in firestore before logging out...
      const { uid } = user;
      await updateDoc(doc(db, `users/${uid}`), {
        isOnline: false,
      });

      // sign the user out
      await signOut(auth);

      // dispatch logout action
      dispatchIfNotUnmounted({ type: 'LOGOUT' });

      // update state
      if (!isUnmounted) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isUnmounted) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsUnmounted(true);
  }, []);

  return { logout, isPending, error };
};
