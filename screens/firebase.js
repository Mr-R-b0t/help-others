// Import the functions you need from the SDKs you need
import { initializeApp } from "@react-native-firebase/app";
import { getAnalytics } from "@react-native-firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmYMOF9N-B11hg6GWttGcI9heUwY_kAB8",
    authDomain: "help-others-9ca37.firebaseapp.com",
    databaseURL: "https://help-others-9ca37-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "help-others-9ca37",
    storageBucket: "help-others-9ca37.appspot.com",
    messagingSenderId: "399222461438",
    appId: "1:399222461438:web:5526775d1ef656db0fe6af",
    measurementId: "G-6MC8H8ZYT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth();