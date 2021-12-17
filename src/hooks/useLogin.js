import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth, db } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

// this hook is used to login in firebase
export const useLogin = () => {
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  // only dispatch if not unmounted
  const dispatchIfNotUnmounted = (action) => {
    if (!isUnmounted) {
      dispatch(action);
    }
  };

  const login = async (email, password) => {
    setIsPending(true);

    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password);

      // update isOnline status in firestore after logging in...
      await updateDoc(doc(db, `users/${res.user.uid}`), {
        isOnline: true,
      });

      // dispatch login action
      dispatchIfNotUnmounted({ type: 'LOGIN', payload: res.user });

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

  return { login, isPending, error };
};
