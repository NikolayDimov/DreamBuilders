import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = {
    apiKey: "AIzaSyCyDP9FHAvKsMiRH4YANWekANCr0Fp9Q7g",
    authDomain: "construnction-company.firebaseapp.com",
    databaseURL: "https://construnction-company-default-rtdb.firebaseio.com",
    projectId: "construnction-company",
    storageBucket: "construnction-company.appspot.com",
    messagingSenderId: "407408396081",
    appId: "1:407408396081:web:c4a71969400a43d4df5210"
};

const app = initializeApp(firebaseApp);
export const firestore_db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);




