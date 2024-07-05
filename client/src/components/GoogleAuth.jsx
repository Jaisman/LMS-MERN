import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css'

const GoogleAuth = () => {
    const navigate = useNavigate()
    const firebaseConfig = {
        apiKey: "AIzaSyAfUGjM_xJ7-JnEf464rJsr0JA7OXc7jD4",
        authDomain: "new--auth-a1342.firebaseapp.com",
        projectId: "new--auth-a1342",
        storageBucket: "new--auth-a1342.appspot.com",
        messagingSenderId: "987459963020",
        appId: "1:987459963020:web:b5c50d017ed7a3c0af53a9"
      };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    
    // let navigate = useNavigate()
     const signInWithGoogle = () => {
        signInWithPopup(auth,provider).then((result)=>{
            const name = result._tokenResponse.displayName;
            const email = result.user.email;
            // const photo = result.user.photoURL;
            localStorage.setItem('name',name)
            localStorage.setItem('email',email)
            // localStorage.setItem('photo',photo)
                  console.log(result._tokenResponse)
                  console.log(result.user)
                //   navigate('home')
        }).catch((error)=>{
              console.log(error)
        })
    
    }
   
  return (
    <div className="App">
    <button onClick={signInWithGoogle} type="button" className="login-with-google-btn" >Sign In with google</button>
  </div>
  )
}

export default GoogleAuth


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAfUGjM_xJ7-JnEf464rJsr0JA7OXc7jD4",
//   authDomain: "new--auth-a1342.firebaseapp.com",
//   projectId: "new--auth-a1342",
//   storageBucket: "new--auth-a1342.appspot.com",
//   messagingSenderId: "987459963020",
//   appId: "1:987459963020:web:b5c50d017ed7a3c0af53a9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);