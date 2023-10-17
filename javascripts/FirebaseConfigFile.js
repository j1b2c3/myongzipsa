import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyD93TYL9EoLH0UVZlpDpfN7dz8ki_0xpr0",
  authDomain: "myongzipsadb.firebaseapp.com",
  projectId: "myongzipsadb",
  storageBucket: "myongzipsadb.appspot.com",
  messagingSenderId: "395432457229",
  appId: "1:395432457229:web:792d1cf44eb5932b041144",
  databaseURL: "https://myongzipsadb-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
export { auth, database };