import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD18aR5SlZyoGjhs5c1RlRPeY2Fb-0LJfY",
    authDomain: "mynewtable-fd97d.firebaseapp.com",
    projectId: "mynewtable-fd97d",
    storageBucket: "mynewtable-fd97d.appspot.com",
    messagingSenderId: "526536680238",
    appId: "1:526536680238:web:a282a7da05ffbebdfa10bf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
