import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth"; // Import Auth
import { getDatabase } from "firebase/database"; // Import Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa2BC_vo59T8ohJU-utHYAEPzcW4NIu1I",
  authDomain: "beri-soif.firebaseapp.com",
  projectId: "beri-soif",
  databaseURL: "https://beri-soif-default-rtdb.firebaseio.com/",
  storageBucket: "beri-soif.appspot.com",
  messagingSenderId: "1092136828956",
  appId: "1:1092136828956:web:c505d49ef5fe9a9cd21fd9",
  measurementId: "G-D3V1M7VTQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Auth
const database = getDatabase(app); // Initialize Realtime Database

// Export the Firebase instances
export { app, firestore, auth, database }; // Include 'firestore' in exports