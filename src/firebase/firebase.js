// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCOyQdNGdTeTjkB7YuGgm87vxav1qsrkGM",
//   authDomain: "test-firebase-a4d1d.firebaseapp.com",
//   projectId: "test-firebase-a4d1d",
//   storageBucket: "test-firebase-a4d1d.appspot.com",
//   messagingSenderId: "820720278684",
//   appId: "1:820720278684:web:f516b9525430e42a5ca159",
//   measurementId: "G-LG27E0KT9R"
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN ,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGEINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app