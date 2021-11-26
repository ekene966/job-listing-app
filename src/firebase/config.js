import app from 'firebase/app';

import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAQn206LtjV0ztG08KSCEDGWYUoXdUwFsU",
    authDomain: "job-listing-5a123.firebaseapp.com",
    projectId: "job-listing-5a123",
    storageBucket: "job-listing-5a123.appspot.com",
    messagingSenderId: "1061723789162",
    appId: "1:1061723789162:web:911da015ccba9fa253b713"
  };


const firebase = app.initializeApp(firebaseConfig); // Initialize Firebase

const firestore = firebase.firestore(); // Initialize Firestore

export { firebase, firestore, app };