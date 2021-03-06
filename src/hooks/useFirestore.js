import { useReducer, useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, serverTimestamp, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null };
    case 'DOCUMENT_CREATED':
      return { isPending: false, document: action.payload, success: true, error: null };
    case 'DOCUMENT_DELETED':
      return { isPending: false, document: null, success: true, error: null };
    case 'DOCUMENT_UPDATED':
      return { isPending: false, document: action.payload, success: true, error: null };
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload };
    default:
      return state;
  }
};

// this hook is used to create and delete documents in firebase
export const useFirestore = (c) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isUnmounted, setIsUnmounted] = useState(false);

  // only dispatch if not unmounted
  const dispatchIfNotUnmounted = (action) => {
    if (!isUnmounted) {
      dispatch(action);
    }
  };

  // create a document
  const createDocument = async (doc) => {
    dispatchIfNotUnmounted({ type: 'IS_PENDING' });

    try {
      const createdAt = serverTimestamp();
      const createdDocument = await addDoc(collection(db, c), { ...doc, createdAt });
      dispatchIfNotUnmounted({ type: 'DOCUMENT_CREATED', payload: createdDocument });
    } catch (err) {
      dispatchIfNotUnmounted({ type: 'ERROR', payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatchIfNotUnmounted({ type: 'IS_PENDING' });

    try {
      await deleteDoc(doc(db, c, id));
      dispatchIfNotUnmounted({ type: 'DOCUMENT_DELETED' });
    } catch (err) {
      dispatchIfNotUnmounted({ type: 'ERROR', payload: err.message });
    }
  };

  // update a dcoument
  const updateDocument = async (id, updates) => {
    dispatchIfNotUnmounted({ type: 'IS_PENDING' });

    try {
      const updatedDocument = await updateDoc(doc(db, c, id), updates);
      dispatchIfNotUnmounted({ type: 'DOCUMENT_UPDATED', payload: updatedDocument });
    } catch (err) {
      dispatchIfNotUnmounted({ type: 'ERROR', payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsUnmounted(true);
  }, []);

  return { createDocument, deleteDocument, updateDocument, response };
};
