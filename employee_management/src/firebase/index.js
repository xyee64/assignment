import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyClWFhni9ebbV2C69xtL4ZVX6d3SkT5GI0",
    authDomain: "employee-management-d3cdf.firebaseapp.com",
    projectId: "employee-management-d3cdf",
    storageBucket: "employee-management-d3cdf.appspot.com",
    messagingSenderId: "1023985461597",
    appId: "1:1023985461597:web:bc5d2602b8778114dd60b4",
    measurementId: "G-DMS4RHL3PB"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default};