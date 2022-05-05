// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC204aAz0P7jnIF5XkQyxzSF48EA8vGSA8",
  authDomain: "react-auth-1496f.firebaseapp.com",
  projectId: "react-auth-1496f",
  storageBucket: "react-auth-1496f.appspot.com",
  messagingSenderId: "791320919752",
  appId: "1:791320919752:web:95a85a996b1bacd594affd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
