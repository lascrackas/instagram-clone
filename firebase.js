import { initializeApp,getApps,getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB93DbutfCN6rvvTvmZ2hGhO6tgp0YysD8",
  authDomain: "instagram-clone-36058.firebaseapp.com",
  projectId: "instagram-clone-36058",
  storageBucket: "instagram-clone-36058.appspot.com",
  messagingSenderId: "293878967020",
  appId: "1:293878967020:web:89fa93c3cf168503d6d3c9",
  measurementId: "G-Y68Y96RDKF"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app,db,storage};