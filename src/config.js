// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjzF5q_NVI9ohW7a1O_A8lHzYrDADFd0w",
    authDomain: "convai-33706.firebaseapp.com",
    projectId: "convai-33706",
    storageBucket: "convai-33706.appspot.com",
    messagingSenderId: "388298254059",
    appId: "1:388298254059:web:03d1ac76ed8b4c11b9c0ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };