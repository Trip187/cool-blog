// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXWiGwfGzU58OdtPIZbN2YgxfnnqPPrp0",
  authDomain: "cool-blog-2dfb9.firebaseapp.com",
  projectId: "cool-blog-2dfb9",
  storageBucket: "cool-blog-2dfb9.firebasestorage.app",
  messagingSenderId: "597341853346",
  appId: "1:597341853346:web:a5026381963146cdcb29fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth(app);
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signOutUser = async () => await signOut(auth);
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

const db = getFirestore();
export const getFeaturedPosts = async () => {
  const collectionRef = collection(db, "posts");
  const q = query(collectionRef, where("isFeatured", "==", true));
  const querySnapshot = await getDocs(q);
  const allPosts = querySnapshot.docs.map((docsnapshot) => {
    return {
      id: docsnapshot.id,
      data: docsnapshot.data(),
    };
  });
  return allPosts;
};

export const getAllPosts = async () => {
  const collectionRef = collection(db, "posts");
  const q = query(collectionRef, orderBy("date", "desc"));

  const querySnapshot = await getDocs(q);

  const allPosts = querySnapshot.docs.map((docSnapshot) => {
    return {
      id: docSnapshot.id,
      data: docSnapshot.data(),
    };
  });
  return allPosts;
};

export const getPostById = async (id) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.id) {
    return docSnap.data();
  } else {
    console.log("No such Document");
  }
};
export const addCommentToPost = async (comment, displayUserName, postId) => {
  try {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const createdAt = new Date();
      const newComment = {
        displayUserName,
        comment,
        createdAt: createdAt.getTime(),
      };
      const data = docSnap.data();
      let newData = null;
      if (data) {
        newData = {
          comments: [...data.comments, newComment],
        };
      } else {
        newData = {
          comments: [newComment],
        };
      }
      await updateDoc(docRef, newData);
      return newData;
    }
  } catch (error) {
    console.log(error.message || "adding new comment");
  }
};
