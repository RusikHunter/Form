import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
    apiKey: "AIzaSyCxf3tyR4BksGoV2EOL3opOLI5MXMOxzqo",
    authDomain: "dmfshoveform.firebaseapp.com",
    projectId: "dmfshoveform",
    storageBucket: "dmfshoveform.firebasestorage.app",
    messagingSenderId: "602935617828",
    appId: "1:602935617828:web:f07c99dbb759f0de45ebb1",
    measurementId: "G-GGJ3P01SBC"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const auth = getAuth(app)
export const db = getFirestore(app)