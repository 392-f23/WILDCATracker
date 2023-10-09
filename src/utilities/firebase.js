// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBryjbyZ8gMrcE-guMryC7KTv8eVgvt5Ks",
	authDomain: "wildcatracker.firebaseapp.com",
	projectId: "wildcatracker",
	storageBucket: "wildcatracker.appspot.com",
	messagingSenderId: "748740578016",
	appId: "1:748740578016:web:0b406fbe2576528ff81e85",
	measurementId: "G-Y4FZZ4GRKH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
