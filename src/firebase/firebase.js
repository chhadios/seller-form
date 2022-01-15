import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBDPvPeeKmEEiT1_riCSW5myKnSyi_wHnQ",
    authDomain: "bazaarlive-4f721.firebaseapp.com",
    projectId: "bazaarlive-4f721",
    storageBucket: "bazaarlive-4f721.appspot.com",
    messagingSenderId: "219320323552",
    appId: "1:219320323552:web:c340189fbb436bb9f56f85",
    measurementId: "G-YXLKR58D63"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase;