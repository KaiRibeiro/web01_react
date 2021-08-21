import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDIUgPtO3A3_xA_IY3ixSD0bKzGVSgzcSw",
  authDomain: "web01secundario.firebaseapp.com",
  projectId: "web01secundario",
  storageBucket: "web01secundario.appspot.com",
  messagingSenderId: "193817949895",
  appId: "1:193817949895:web:8afbf923efd662f309f0e2"
};

export default firebase.initializeApp(firebaseConfig);
//firebase.analytics();
