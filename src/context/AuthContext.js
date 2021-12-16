import { createContext, useEffect, useReducer } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'IS_AUTH_READY':
      return { ...state, user: action.payload, isAuthReady: true };
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'IS_AUTH_READY', payload: user });
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
