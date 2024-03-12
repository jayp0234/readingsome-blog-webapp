import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDbbO3Nyk02-TnUyF83egGo-4JTTsepYeY",
  authDomain: "readingsome-adb80.firebaseapp.com",
  projectId: "readingsome-adb80",
  storageBucket: "readingsome-adb80.appspot.com",
  messagingSenderId: "280702742203",
  appId: "1:280702742203:web:928d70b14ba88ed9a1839e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null ;

    await signInWithPopup(auth, provider).then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err)
    })

    return user
} 
