import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBq9Pzf-IuAjEnn4BHq9r14VC6yi3M5X80',
  authDomain: 'mgmt-react.firebaseapp.com',
  projectId: 'mgmt-react',
  storageBucket: 'mgmt-react.appspot.com',
  messagingSenderId: '408744038098',
  appId: '1:408744038098:web:992141275ee311baf0e70b',
};

// init firebase
const app = initializeApp(firebaseConfig);

// init firestore
const db = getFirestore(app);

// init auth
const auth = getAuth(app);

// init firebase storage
const storage = getStorage(app);

export { db, auth, storage };
