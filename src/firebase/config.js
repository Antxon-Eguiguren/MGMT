import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBq9Pzf-IuAjEnn4BHq9r14VC6yi3M5X80',
  authDomain: 'mgmt-react.firebaseapp.com',
  projectId: 'mgmt-react',
  storageBucket: 'mgmt-react.appspot.com',
  messagingSenderId: '408744038098',
  appId: '1:408744038098:web:992141275ee311baf0e70b',
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// init auth
const auth = getAuth();

export { db, auth };
