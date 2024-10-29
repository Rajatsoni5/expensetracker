// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database"; 
// Your web app's Firebase configuration



const firebaseConfig = {
  apiKey: "AIzaSyAY-wgqIt319Lx0cjS2LywB4qq26m-FMAI",
  authDomain: "expensetracker-3957a.firebaseapp.com",
  projectId: "expensetracker-3957a",
  storageBucket: "expensetracker-3957a.appspot.com",
  messagingSenderId: "600938661378",
  appId: "1:600938661378:web:f094d28d9b53f99e62091b",
  databaseURL: "https://expensetracker-3957a-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const databaseURL = "https://expensetracker-3957a-default-rtdb.asia-southeast1.firebasedatabase.app";
const database = getDatabase(app);

export { database };
