const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  otp,
} = require("firebase/auth");
const firebaseConfig = {
  apiKey: "AIzaSyBrigAza54IO6NxMKJ1qPa3sInB8xkGkX0",
  authDomain: "aime-390301.firebaseapp.com",
  projectId: "aime-390301",
  storageBucket: "aime-390301.appspot.com",
  messagingSenderId: "65604286298",
  appId: "1:65604286298:web:ad9ffd380c5c1d86fc2563",
};

const firebase = initializeApp(firebaseConfig);
module.exports = firebase;
