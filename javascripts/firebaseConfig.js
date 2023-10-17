// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey : "AIzaSyCz4vQbdJ2yYmc1Mb0x6gC_FAAKkPIBaUw",
  authDomain : "myongjipsa.firebaseapp.com",
  projectId : "myongjipsa",
  storageBucket : "myongjipsa.appspot.com",
  messagingSenderId : "196372437968",
  appId : "1:196372437968:web:fbb75ff24583af24af77d5",
  measurementId : "G-7Q77CBC791"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);