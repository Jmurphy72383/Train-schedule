console.log("connected!");

//Initializing Firebase

var config = {
    apiKey: "AIzaSyDFMHeTXeTrFYaCe_ONw7tUm3_5y98dqYA",
    authDomain: "train-scheduler-uncc.firebaseapp.com",
    databaseURL: "https://train-scheduler-uncc.firebaseio.com",
    projectId: "train-scheduler-uncc",
    storageBucket: "train-scheduler-uncc.appspot.com",
    messagingSenderId: "1042163805875"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();