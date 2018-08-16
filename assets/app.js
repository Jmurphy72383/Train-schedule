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
var trainName = "";
var destination = "";
var firstTrainTime = 0;
var frequency = 0;

$("button").on("click", function() {
    event.preventDefault();
    
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    })
})

database.ref().on("child_added", function(snapshot) {

    var sv = snapshot.val();
    var firstTimeConverted = moment(snapshot.val().firstTrainTime, "hh:mm").subtract(1, "days");
    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    var remainder = timeDiff % snapshot.val().frequency;
    var minsUntilTrain = snapshot.val().frequency - remainder;
    var nextTrainTime = moment().add(minsUntilTrain, "minutes");

    $("tbody").append("<tr><td>" + sv.trainName + "</td><td>" + sv.destination + "</td><td>" + sv.frequency + "</td><td>" + moment(nextTrainTime).format('hh:mm') + "</td><td>" + minsUntilTrain + "</td></tr>");
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});