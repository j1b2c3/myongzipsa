import firebase from "firebase/compat/app"
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth"; // 코드 추가

import { firebaseConfig } from "./ApiKeys";
import "firebase/compat/auth"
import "firebase/compat/database"
import "firebase/compat/firestore"
import "firebase/compat/functions"
import  "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}


 // export const auth = getAuth(app); // 코드 추가

export const RealTimeDatabase=firebase.database();
export const firestoreDatabase=firebase.firestore();
export const authService=firebase.auth();
export const storageService=firebase.storage();
 // export const app=firebase.app();
// if(!firebase.app.length){
//    firebase.app.initializeApp(firebaseConfig);