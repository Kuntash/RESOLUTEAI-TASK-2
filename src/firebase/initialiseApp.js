// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCWsE3zt23CGg51JrN6C527ybArQioc_Vs',
  authDomain: 'resoluteai-ticketing-system.firebaseapp.com',
  projectId: 'resoluteai-ticketing-system',
  storageBucket: 'resoluteai-ticketing-system.appspot.com',
  messagingSenderId: '775544540948',
  appId: '1:775544540948:web:007b24d54ac2dc1fb27c01',
  measurementId: 'G-D22B1GS3K4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
