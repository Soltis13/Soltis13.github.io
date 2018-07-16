//Require main npm modules
    require('dotenv').config();
    var Twitter = require('twitter')
    var Spotify = require('node-spotify-api');
    var omdb = require('omdb');
    var omdbrequest = require('request');
    var fs = require('fs');
    var client = require("./keys.js");

//add code to import access keys
    var action = process.argv[2];
    var value = process.argv[3];
    //console.log("Input "+action)
    //console.log("Value "+value)  

//access the keys
    var clientSpotify = new Spotify(client.spotify);
    var clientTwitter = new Twitter(client.twitter);
    //console.log(clientSpotify)
    //console.log(clientTwitter)


//---------------------------------
//Main Function 1 - Twitter Liri
//liri should access there commants
//* `my-tweets`
//node liri.js my-tweets
//This will show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets(a){
    //TODO add user name
    var params = {screen_name: '', limit: 1 };
    clientTwitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if(error){
            console.log(error)
        }
        if (!error) {
            //console.log(tweets);
            console.log(JSON.stringify((response).body))
            //TODO check object response and formate output
        }
    });
}

//---------------------------------
//Main Function 2 - Spottify
 //* `spotify-this-song`
     //node liri.js spotify-this-song '<song name here>'
     //This will show the following information about the song in your terminal/bash window

     //Artist(s)
     //The song's name
     //A preview link of the song from Spotify
     //The album that the song is from

     //If no song is provided then your program will default to "The Sign" by Ace of Base.
     //"id":"5ELRkzdzz0HvGpMDlfZHkV"

 function Song(a, limit, val){
     console.log(action+ " "+ a)
     clientSpotify.search({type: 'track', query: a, limit: limit}, function(err, data){
         if(err){
             console.log("error occurred: "+ err);
             return;
         }
         if(!err){
         //var song = JSON.stringify(data.tracks.items[0].name)
         //console.log(song)
         //console.log(JSON.stringify(data))

         console.log("Artists: "+JSON.stringify(data.tracks.items[val].artists[0].name));
         console.log("Song Name: "+JSON.stringify(data.tracks.items[val].name));
         console.log("Song Link: "+JSON.stringify(data.tracks.items[val].external_urls.spotify));
         console.log("Album: "+ JSON.stringify(data.tracks.items[val].album.name));
         //TODO check object response and formate output
         }
     })
 }

//  function NoSong(){
//     console.log(action+ " "+ value)
//     clientSpotify.lookup({type: 'track', id:'5ELRkzdzz0HvGpMDlfZHkV'}, function(err, data){
//         if(err){
//             console.log("error occurred: "+ err);
//             return;
//         }
//         if(!err){
//         //var song = JSON.stringify(data.tracks.items[0].name)
//         //console.log(song)
//         //console.log(JSON.stringify(data))

//         // console.log("Artists: "+JSON.stringify(data.tracks.items[0].artists[0].name));
//         // console.log("Song Name: "+JSON.stringify(data.tracks.items[0].name));
//         // console.log("Song Link: "+JSON.stringify(data.tracks.items[0].external_urls.spotify));
//         // console.log("Album: "+ JSON.stringify(data.tracks.items[0].album.name));
//         //TODO check object response and formate output
//         }
//     })
//  }


//---------------------------------
//Main Function 3 - Movie omdb
 //* `movie-this`
     //node liri.js movie-this '<movie name here>'
    // This will output the following information to your terminal/bash window:

     //    * Title of the movie.
     //    * Year the movie came out.
     //  * IMDB Rating of the movie.
         // * Rotten Tomatoes Rating of the movie.
         // * Country where the movie was produced.
         // * Language of the movie.
         // * Plot of the movie.
         // * Actors in the movie.

// if (action === "movie-this"){
//     if (value === "NaN"){
//         value = "Mr.Nobody"
//     };

//     omdb.search(value, function(err, movies) {
//         if(err) {
//             return console.log(err);
//         }
//         if(movies.length < 1){
//             return console.log("No movies were found.");
//         }
//         movies.forEach(function(movie){
//             console.log('%s (%d)', movie.title, movie.year);
//         });
// //     });
// // }

function omdbMovies(a){

    omdbrequest("http://www.omdbapi.com/?t="+a+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            //console.log(JSON.parse(body));
            //    * Title of the movie.
            console.log("Title of the Movie: "+JSON.parse(body).Title)
            //    * Year the movie came out.
            console.log("Year the Movie came out: "+JSON.parse(body).Year)
            //  * IMDB Rating of the movie.
            console.log("IMDB Rating: "+JSON.parse(body).imdbRating)
            // * Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomatoes gives it: "+JSON.parse(body).Metascore)
            // * Country where the movie was produced.
            console.log("Produced in: "+JSON.parse(body).Country)
            // * Language of the movie.
            console.log("Language: "+JSON.parse(body).Language)
            // * Plot of the movie.
            console.log("Movie Plot: "+JSON.parse(body).Plot)         
            // * Actors in the movie.
            console.log("Main Actors: "+JSON.parse(body).Actors)
        }
    });
}


//---------------------------------
//Main Function 4 - `do-what-it-says`
     //node liri.js do-what-it-says
     //Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     //It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
     //Feel free to change the text in that document to test out the feature for other commands.

function doWhat(){
    //read in text from file random.txt with file system
    fs.readFile("random.txt", "utf8", function(err, data){
        //look for error in read
        if (err) {
            return console.log(err)
        }
        //split text data into array by comma
        var dataArr = data.split(",")

        //look through dataArr 
        for(var i=0; i<dataArr.length; i++){
            action = undefined
            value = undefined
            console.log(action+" "+value)
            console.log("for loop dataArr: "+i+" "+dataArr[i])
            //is [0] equal to a command, 
            if(dataArr[i]=="my-tweets" || dataArr[i]=="spotify-this-song" || dataArr[i]=="movie-this"){
                action = dataArr[i];
                console.log("found action: "+dataArr[i]+" Next value is: "+dataArr[i+1])
           
                //if yes, //is next position equal to command?
                if(dataArr[i+1]!=="spotify-this-song" && dataArr[i+1] !== "my-tweets" && dataArr[i+1] !== "movie-this"){
                  //if no, make it equal to value and run command request
                  value = dataArr[i+1]
                  console.log("set value to next position value: "+ value)
                }
             
            }else{action="noAction"}
            console.log(action+" "+value)
            
            //look for twitter
            if(action ==="my-tweets"){
                 myTweets(value);

            }
             //look for spotify
             else if(action === "spotify-this-song"){
  
                 //set call search limit         
                 var limit = 1
                 var val = 0
                 if(value === undefined){
                    value = "The Sign";
                    limit = 6;
                    val = 5;
                    //NoSong()
                }
                 Song(value,limit,val);

            }else if(action === "movie-this"){
                 if (value === undefined){
                     value = "Mr.Nobody"
                 };
                 omdbMovies(value)

            }else if(action === "noAction"){
                 
            }else{console.log("Error: not a valid request")}

        }



        //console.log("Loaded data0 is: " + dataArr[0])
        //console.log("Loaded data1 is: " + dataArr[1])   
    
        //look for twitter
        // if(data[0] ==="my-tweets"){
        //     myTweets();

        // }
        // //look for spotify
        // else if(dataArr[0] === "spotify-this-song"){
        //     //set call search limit         
        //     var limit = 1
        //     var val = 0
        //     Song(dataArr[1],limit,val);

        // }else if(data[0] === "movie-this"){
        //     if (value === undefined){
        //         value = "Mr.Nobody"
        //     };
        //     omdbMovies(value)

        // }else{console.log("not a valid request")}
    })
}


//Call functions as necissary

//Twitter Function "myTweets" for liri "my-tweets" myTweets()
if (action == "my-tweets"){ 
    myTweets(value);
}

//Call Spotify function "function Song(value, limit, val)"
if (action === "spotify-this-song"){
    var limit = 1
    var val = 0
     if(value === undefined){
         value = "The Sign";
         limit = 6;
         val = 5;
         //NoSong()
     }
     Song(value, limit, val)
 }

 //Call movie omdb  "omdbMovies(value)"
 if(action === "movie-this"){
    if (value === undefined){
        value = "Mr.Nobody"
    };

   omdbMovies(value)
}

//Call omni function for reading file "doWhat()"
 if(action === "do-what-it-says"){
     doWhat()
 }

