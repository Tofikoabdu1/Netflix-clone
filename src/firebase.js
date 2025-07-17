import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDz9a-bwIOL0C53n15W1Mr8RLRZttqzqzM",
  authDomain: "netflix-clone-cff9e.firebaseapp.com",
  projectId: "netflix-clone-cff9e",
  storageBucket: "netflix-clone-cff9e.firebasestorage.app",
  messagingSenderId: "481889360021",
  appId: "1:481889360021:web:874d8b6fece6424283239c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const singup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(
      collection(db, "user", {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      })
    );
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, singup, logout };
