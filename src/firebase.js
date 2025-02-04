import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_8esGfDo0R91xwRkyO5teQ2i5dZth9Dg",
  authDomain: "medicine-tracker-a9c6f.firebaseapp.com",
  projectId: "medicine-tracker-a9c6f",
  storageBucket: "medicine-tracker-a9c6f.appspot.com",
  messagingSenderId: "566257166281",
  appId: "1:566257166281:web:eb875643515e01fddf2a18",
  measurementId: "G-1YVYZDTRHC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// Function to fetch user emails and start dates
export const fetchUserData = async () => {
  const querySnapshot = await getDocs(collection(db, "medications"));
  const userData = [];
  querySnapshot.forEach((doc) => {
    userData.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return userData;
};