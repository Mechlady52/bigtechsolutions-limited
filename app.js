import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// FIREBASE CONFIG
const firebaseConfig = {

  apiKey: "AIzaSyAEoF4YSWoj98XV8uHAucwmoK47viRXySc",
  authDomain: "mydatabase-19c2e.firebaseapp.com",
  databaseURL: "https://mydatabase-19c2e-default-rtdb.firebaseio.com",
  projectId: "mydatabase-19c2e",
  storageBucket: "mydatabase-19c2e.firebasestorage.app",
  messagingSenderId: "1055071853451",
  appId: "1:1055071853451:web:e4a4e94e3ad5ae53c02d8e",
  measurementId: "G-MH4XWPK7LK"


};


// INITIALIZE
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// WAIT UNTIL HTML LOADS
document.addEventListener("DOMContentLoaded", () => {

    const registerBtn = document.getElementById("registerBtn");
    const loginBtn = document.getElementById("loginBtn");
    const googleLoginBtn = document.getElementById("googleLoginBtn");

    // 🚨 SAFETY CHECKS
    if (!registerBtn || !loginBtn || !googleLoginBtn) {
        console.error("One or more buttons not found in DOM!");
        return;
    }

    // ================= REGISTER =================
    registerBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const phone = document.getElementById("registerPhone").value;
        const password = document.getElementById("registerPassword").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                phone,
                uid: user.uid
            });

            alert("Account created!");

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    });


    // ================= LOGIN =================
    loginBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    });


    // ================= GOOGLE LOGIN =================
    const provider = new GoogleAuthProvider();

    googleLoginBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                uid: user.uid
            });

            alert("Google Sign-In Successful!");

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    });

});

// =====================================================
// MODAL FUNCTIONS (PUT THIS BELOW EVERYTHING)
// =====================================================

const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");

function openLogin(e){
    e.preventDefault();

    loginModal.style.display = "flex";
    registerModal.style.display = "none";
}

function openRegister(e){
    e.preventDefault();

    registerModal.style.display = "flex";
    loginModal.style.display = "none";
}

function closeModal(){
    loginModal.style.display = "none";
    registerModal.style.display = "none";
}

function switchToRegister(){
    loginModal.style.display = "none";
    registerModal.style.display = "flex";
}

function switchToLogin(){
    registerModal.style.display = "none";
    loginModal.style.display = "flex";
}

window.onclick = function(e){

    if(
        e.target === loginModal ||
        e.target === registerModal
    ){
        closeModal();
    }
}
