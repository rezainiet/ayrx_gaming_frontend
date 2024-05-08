// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYxgT0fyC8SwNro82OhiTyAoOE2ZQ6iAY",
    authDomain: "ayrx-gaming.firebaseapp.com",
    projectId: "ayrx-gaming",
    storageBucket: "ayrx-gaming.appspot.com",
    messagingSenderId: "728637091723",
    appId: "1:728637091723:web:88d1f19881e156664a898e",
    measurementId: "G-PJPX61PW6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;