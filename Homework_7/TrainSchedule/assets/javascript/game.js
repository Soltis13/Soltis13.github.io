  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC5zdDcMvII0JgaWYyeIFDmwDZdIg1c1dU",
    authDomain: "webdevbootcamp-e63f7.firebaseapp.com",
    databaseURL: "https://webdevbootcamp-e63f7.firebaseio.com",
    projectId: "webdevbootcamp-e63f7",
    storageBucket: "",
    messagingSenderId: "686459628072"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// Initial Values

var objdata = {

    TrainName: "",
    Destination: "",
    Frequency: 0,
    NextArrival: 0,
    MinutesAway: 0,
    FirstTime: 0,
    
}

  // Capture Button Click
  $("#submit").on("click", function(event) {
    console.log("You clicked the button")
     // Don't refresh the page!
     event.preventDefault();
 
     objdata.TrainName = $("#TrainName").val().trim();
     objdata.Destination = $("#Destination").val().trim();
     objdata.FirstTime= $("#FirstTime").val().trim();
     objdata.Frequency = $("#Frequency").val().trim();
 
     database.ref().push({
       TrainName: objdata.TrainName,
       Destination: objdata.Destination,
       FirstTime: objdata.FirstTime,
       Frequency: objdata.Frequency
     });
 
    
 });

 var a = 0;
database.ref().on("child_added", function(childsnapshot){       
    a++;
  console.log(a)
  //console.log(childsnapshot.val().TrainName);
  //console.log(childsnapshot.val().Destination)
  //console.log(childsnapshot.val().FirstTime)
  //console.log(childsnapshot.val().Frequency)

  //minutes away = (abs(current time - first time ) % frequency)
  //NextArrival currenttime + ((current time - first time ) % frequency)
  

   var HourFirstTime = childsnapshot.val().FirstTime
   var Hour = HourFirstTime.slice(0,2);
   //console.log(Hour)
   var MinFirstTime = childsnapshot.val().FirstTime
   var minutes = MinFirstTime.slice(-2);
   //console.log(minutes)
   var totalStartTime = +Hour * 60 + +minutes
   //console.log(totalStartTime)

  var Time = new Date()
  // var Arrival = childsnapshot.val().FirstTime

  var HourTime = Time.getHours() 
  console.log("pre hour time" + HourTime)
  var MinuteTime = Time.getMinutes()
  console.log("pre min time" + MinuteTime)
  var totalCurrentTime = HourTime * 60 + MinuteTime + ( 24 * 60 )

  console.log("pre current time" + totalCurrentTime)

  var freq = childsnapshot.val().Frequency

  console.log("pre freq" + freq)

  var MinutesAway = 0 
  var Arrival  = 0

  for (var i = totalStartTime ; i < totalCurrentTime; i = i + +freq ){
    //console.log(i)
    //console.log(totalCurrentTime)
    //console.log(+freq)
    
    Arrival = i + +freq
    MinutesAway = Arrival - totalCurrentTime

  }
  var NextArrivalHours = 0
  var nah = ''
  var NextArrivalMinutes = 0
  var nam = ''
  var namnew = ''
  var NextArrival = ''

  console.log("arrival" + +Arrival)
  var NextArrivalHours =(Math.floor((+Arrival - 1440) / 60)%24);
  console.log("hours"  + NextArrivalHours)
  var nah = NextArrivalHours.toString()
  var NextArrivalMinutes = (((+Arrival-1440) % 60) / 100) +0.001
  var newNextArrivalMinutes = NextArrivalMinutes.toFixed(3);
  console.log("min" + newNextArrivalMinutes)
  var nam = newNextArrivalMinutes.toString()
  var namnew = nam.slice(-3,-1)
  var NextArrival = nah + ":" + namnew
  console.log(MinutesAway)
  console.log(NextArrival)


  $("#table > tbody").append("<tr> <td>" + childsnapshot.val().TrainName + "</td>" 
                      + "<td>" + childsnapshot.val().Destination + "</td>" 
                      + "<td>" + childsnapshot.val().Frequency + "</td>" 
                      + "<td>" + NextArrival + "</td>" 
                      + "<td>" + MinutesAway +  "</td> </tr>")
});
