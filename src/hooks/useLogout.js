import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

// this hook is used to logout in firebase
export const useLogout = () => {
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

  const logout = async () => {
    setIsPending(true);

    try {
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
