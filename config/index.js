const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, otp } = require("firebase/auth");
const firebaseConfig = {
    apiKey: "AIzaSyASGhrzhbiJjx0anndtCsnLLO_6XYMPOAE",
    authDomain: "aime-sulut.firebaseapp.com",
    projectId: "aime-sulut",
    storageBucket: "aime-sulut.appspot.com",
    messagingSenderId: "17458371709",
    appId: "1:17458371709:web:8522456174fd2950586514",
    measurementId: "G-ZQ1L5H3E29"
};

const firebase = initializeApp(firebaseConfig);
module.exports = firebase;