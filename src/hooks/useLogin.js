import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
    setError(null);
    setIsPending(true);

    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password);

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
