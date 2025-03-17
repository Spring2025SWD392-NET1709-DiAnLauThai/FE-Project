// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1HLG_CrYJU_KZgtoKffeJk_LS87G3dFM",
  authDomain: "swd-project-2025.firebaseapp.com",
  projectId: "swd-project-2025",
  storageBucket: "swd-project-2025.firebasestorage.app",
  messagingSenderId: "203962706028",
  appId: "1:203962706028:web:7d6c3c6936021ae76f5049",
  measurementId: "G-7HDTPX8Y31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {
  app,
  analytics,
  auth,
  provider
}