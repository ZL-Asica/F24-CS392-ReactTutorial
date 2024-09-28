import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5gbKjg52vJ8uD1XjdVGBA7o3OdtbzuWU",
  authDomain: "f24-cs392-reacttutorial.firebaseapp.com",
  databaseURL: "https://f24-cs392-reacttutorial-default-rtdb.firebaseio.com",
  projectId: "f24-cs392-reacttutorial",
  storageBucket: "f24-cs392-reacttutorial.appspot.com",
  messagingSenderId: "316704840970",
  appId: "1:316704840970:web:1a8030c44c93a0f812aef3",
  measurementId: "G-NV232NPWRR"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

const database = getDatabase(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
      setData(snapshot.val());
    }, (error) => {
      setError(error);
    })
  ), [path]);

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
      .then(
        () => setResult(makeResult()),
        console.log(value)
      )
      .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  console.log(result);

  return [updateData, result];
};

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      console.log(error);
    });
};

const firebaseSignOut = () => {
  signOut(getAuth(firebase)).then(() => {
    console.log('Sign out successful');
  }).catch((error) => {
    console.log(error);
  });
};

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ), []);

  return [user];
};
