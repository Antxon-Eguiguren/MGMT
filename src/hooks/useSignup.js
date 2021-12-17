import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth, storage, db } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';

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

  const signUp = async (email, password, displayName, thumbnail) => {
    setIsPending(true);

    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // upload user thumbnail to firebase storage
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const storageRef = ref(storage, uploadPath);
      const uploadTask = uploadBytesResumable(storageRef, thumbnail);
      const img = await uploadTask.then();
      const imgUrl = await getDownloadURL(img.ref);

      // add display name and thumbnail to user
      await updateProfile(res.user, { displayName, photoURL: imgUrl });

      // create user document in firestore
      await setDoc(doc(db, `users/${res.user.uid}`), {
        isOnline: true,
        photoURL: imgUrl,
        displayName,
      });

      // dispatch login action
      dispatchIfNotUnmounted({ type: 'LOGIN', payload: res.user });

      if (!isUnmounted) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isUnmounted) {
        console.log(err);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsUnmounted(true);
  }, []);

  return { signUp, isPending, error };
};
