import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// this hook is used to sign up in firebase
export const useSignup = () => {
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

  const signup = async (email, password, displayName) => {
    setIsPending(true);

    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // add display name to user
      await updateProfile(res.user, { displayName });

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

  return { signup, isPending, error };
};
