
//define variables
var winScore = document.getElementById("wins");
var loses = document.getElementById("loses");
var guessesLeft = document.getElementById("guessesLeft");
var guessesMade = document.getElementById("guessesMade");
wins = 0;
loses = 0;

var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var randomLetter = "";
var currentLetter = "";


//Start new game
newGame();

//reset game counters
function newGame() {
    guessesLeft = 10;
    guessesMade = ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"];
    console.log(wins, loses );
    updateScreen();
    newLetter();
}

//Generate a new random letter from alphabet
function newLetter() {
    //Random runber 1 - array length
    var randomNum = Math.random() * alphabet.length;
    randomNum = Math.floor(randomNum);
    randomLetter = alphabet[randomNum];
    console.log("the letter to guess is: " + randomLetter);
}

//push varriables to HTML
function updateScreen() {
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("loses").innerHTML = loses;
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("guessesMade").innerHTML = guessesMade;
}

//check for valid guess
function validGuess() {
    for(var i=0; i < alphabet.length; i++){
        if(currentLetter === alphabet[i]){
            console.log("validguess if statment");
            return true;
        }
    }
}

//check for if the guess was already made
function repeatGuess(){
    for(var i=0; i < guessesMade.length; i++){
        if(currentLetter === guessesMade[i]){
            return true //this guess has been made
        }
    }
}

//add guesses to array of made guesses
// function updateGuessesMade(){
//     guessesMade.push(currentLetter);
//     guessesMade.sort();
// }

//replace update funtion with alphabetical list of guesses.
    //guessmade array of 26 dashes
    //for length of guesses array does current letter = alpahbet[i]
    //if so push current letter to guessesmade[i] 
function updateGuessesMade(){
    console.log(guessesMade.length);
    for(i=0; i < alphabet.length; i++){
        if(currentLetter === alphabet[i]){
            guessesMade.splice(i,1,currentLetter);
        }
    }
} 

//look for key entries
document.onkeyup = function(i){

    //capture key input and place in string 
    currentLetter = String.fromCharCode(i.keyCode).toUpperCase();
    console.log(currentLetter + " key input section");

    //is valid guess a-z
    if(validGuess()){
        //console.log(validGuess());
        if(repeatGuess() !== true){
            console.log("valid guess with no repeat");

            //check if guess is right
            if(currentLetter === randomLetter){
                alert("The letter was " + randomLetter +  "\r" + "Congrats!!  You Win!!");
                wins++
                newGame();
                return
            }

            //reduce guesses left by 1
            guessesLeft--;

            //check for lose game
            if(guessesLeft === 0){
                alert("The letter was " + randomLetter + "\r" + "But you lost.  Better luck next time.")
                loses++;
                newGame();
                return;
            }

            //add guess to guessesmade
            updateGuessesMade();
            console.log(guessesMade);

            //update screen
            updateScreen();
        }
    }
}
