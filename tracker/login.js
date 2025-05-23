import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBEwVNDsqmBwXP1KrSlwhsYG7OFO02qwVc",
    authDomain: "project-cost-tracker-61d3f.firebaseapp.com",
    projectId: "project-cost-tracker-61d3f",
    storageBucket: "project-cost-tracker-61d3f.firebasestorage.app",
    messagingSenderId: "120147709075",
    appId: "1:120147709075:web:94bd89ccc30258c6ee1166",
    measurementId: "G-FLSLV97RLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//inputs


const auth = getAuth(app);

const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("Logging In...");
            window.location.href = "costmanager/index.html";

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
})