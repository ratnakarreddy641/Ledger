import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PID,
    storageBucket: process.env.REACT_APP_SBUK,
    messagingSenderId: process.env.REACT_APP_MSGSEN_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MID
  };

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const provider =new GoogleAuthProvider();
export {auth, provider, db};