( document ).ready(function() {
    
    
    
    var firebaseConfig = {
        apiKey: "AIzaSyBBtKnmFUSEOJj80lPJ4o6-IyIjyBDYAEA",
        authDomain: "bootcamp-fbb2b.firebaseapp.com",
        databaseURL: "https://bootcamp-fbb2b.firebaseio.com",
        projectId: "bootcamp-fbb2b",
        storageBucket: "bootcamp-fbb2b.appspot.com",
        messagingSenderId: "230449897460",
        appId: "1:230449897460:web:4ccfedf6ba3c9b884ba3a1",
        measurementId: "G-XR436MD477"
      };
      
      firebase.initializeApp(firebaseConfig);
    
     var database = firebase.database();
    
    
    $("#trainInfoBtn").on("click", function(event) {
        event.preventDefault(); 
    
        
        var trainName = $("#name").val().trim();
        var destination = $("#dest").val().trim();
    
        
        var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");
    
        var frequency = $("#freq").val().trim();
        

        var currentTime = moment();
        console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));
    
         console.log(trainName);
        console.log(destination);
         console.log(firstTime);
         console.log(frequency);
         console.log(currentTime);
    
        var newTrain = {
    
            train: trainName,
            trainGoing: destination,
            trainComing: firstTime,
            everyXMin: frequency
        }
        database.ref().push(newTrain);
        
        //clears elements before adding new text
        $("#name").val("");
        $("#dest").val("");
        $("#firstTime").val("");
        $("#freq").val("");
        return false;
    
    }); 
    
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    
            console.log(childSnapshot.val());
            //store in variables
            var trainName = childSnapshot.val().train;
            var destination =childSnapshot.val().trainGoing;
            var firstTime = childSnapshot.val().trainComing;
            var frequency = childSnapshot.val().everyXMin;
    
    
    
            var trainTime = moment.unix(firstTime).format("hh:mm");
            var difference =  moment().diff(moment(trainTime),"minutes");
            var trainRemain = difference % frequency;
            var minUntil = frequency - trainRemain;
            var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');
            $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");
    
    });
 });
    
    