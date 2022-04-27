// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgD_2MupOI8xODHZrz_BZkO-QF1CqxytE",
  authDomain: "react-native-book-tracker.firebaseapp.com",
  projectId: "react-native-book-tracker",
  storageBucket: "react-native-book-tracker.appspot.com",
  messagingSenderId: "429395988852",
  appId: "1:429395988852:web:0a9ae53b88e36afa561c21",
  // Initialize Firebase
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
