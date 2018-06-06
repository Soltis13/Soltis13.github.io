// Declared Global Variables

// Words to guess from.
var wordList = ["HUMPTYDUMPTY", "JACKANDJILL", "HOTCROSSBUNS", "MARYHADALITTLELAMB", "OLDMACDONALD", "TWINKLELITTLESTAR"];

//Computer selected solution
var chosenWord = "";

//Break solution into individual letters.
var lettersInChosenWord = [];

//number of blanks shown in solution
var numBlanks = 0;

//Hold the blanks and picked letters
var blanksandSuccesses = [];

//record wrong guesses
var wrongGuesses = [];

//all letters guesses
var lettersGuesses = "";

//Basic Game Counters
var winCounter = 0;
var livesCounter = 3;
var numGuessesLeft = 9;
var gameOver = true;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


//Functions

function startGame() {
  // Reset the guesses back to 0.
  numGuesses = 9;

  // Solution chosen randomly from wordList.
  chosenWord = wordList[Math.floor(Math.random() * wordList.length)];

  // The word is broken into individual letters.
  lettersInChosenWord = chosenWord.split("");

  // We count the number of letters in the word.
  numBlanks = lettersInChosenWord.length;

  //reset guessed word from last time.
  blanksandSuccesses = [];

  //reset wrong guesses from last time
  wrongGuesses = [];

  // Fill up the blanksAndSuccesses list with appropriate number of blanks.
  // This is based on number of letters in solution.
  for (var i = 0; i < numBlanks; i++) {
    blanksandSuccesses.push("_");
  }

  // Print the initial blanks in console.
  console.log(blanksandSuccesses);

  // Reprints the guessesLeft to 9.
  document.getElementById("guessesRemaining").innerHTML = numGuesses;

  // Prints the blanks at the beginning of each round in the HTML.
  document.getElementById("currentWord").innerHTML = blanksandSuccesses.join(" ");

  // Clears the wrong guesses from the previous round.
  document.getElementById("incorrectGuesses").innerHTML = wrongGuesses.join(" ");
}
//console.log(startGame())

//checkLetters, looking for letters to match the user guesses.
//pass in the letter guessed and look in the chosenword for correct.
function checkLetters(letter) {

    //is the letter found anywhere in the word.
    var letterInWord = false;

    //check if a letter is inside the array.
    for (var i = 0; i < numBlanks; i++){
        if (chosenWord[i] === letter){
            letterInWord = true;
        }
    }

    //If  true then find the letter 
    if (letterInWord){

        for (var j = 0; j < numBlanks; j++){

            //Add to the blanks and successes
           if (chosenWord[j] == letter){
               blanksandSuccesses[j] = letter;
           }
        }
        console.log(blanksandSuccesses);
    }
    else {//letter is not in the word

        //Add letter to the wrong guesses list
        wrongGuesses.push(letter);

        //subtract a guess
        numGuesses--;

    } 
}
//console.log(checkLetters("E"));

//Reset the game function
function Complete() {

    //Update the html

    // Reprints the guessesLeft 
    document.getElementById("guessesRemaining").innerHTML = numGuesses;

    // Prints the blanks at the beginning of each round in the HTML.
    document.getElementById("currentWord").innerHTML = blanksandSuccesses.join(" ");

    // Clears the wrong guesses from the previous round.
    document.getElementById("incorrectGuesses").innerHTML = wrongGuesses.join(" ");

    //check for win conditions
    console.log("the lettersin the chosen word are" + lettersInChosenWord.toString());
    console.log("blanks and sucesses are" + blanksandSuccesses.toString());
    if(lettersInChosenWord.toString() === blanksandSuccesses.toString()){

        winCounter++;

        alert("You Win");

        // Update the win counter in the HTML
        document.getElementById("winsCount").innerHTML = winCounter;

        //New game
        startGame();
    }
    else if (numGuesses === 0) {

        livesCounter--;

        alert("You lose");

        // Update the loss counter in the HTML
        document.getElementById("livesCount").innerHTML = livesCounter;

        // Restart the game
        startGame();
    }
}

//check for valid guess
function validGuess() {
    //console.log("THe currentLetter to checkfor guess is" + currentLetter);
    for(var i=0; i < alphabet.length; i++){
        //console.log(alphabet[i]);
    
         if(letterGuessed === alphabet[i]){
             //console.log("the guess of " + currentLetter + " is a validguess" );
             return true
         }
     }
};

//check for repeated guess
function repeatGuess() {
    //console.log("The current Letter is; " + currentLetter)
    for(var i=0; i < lettersGuesses.length; i++){
        //console.log(guessesArray)
        if(letterGuessed === lettersGuesses[i]){
            return true //this guess has been made
        }
    }
    return false;    
};

//check for end game
function endGame() {
    if(livesCounter === 0 || winCounter === 3){
        gameOver === true;
        livesCounter = 3;
        winCounter = 0;
        alert("Game over.  Press enter to restart.")
    }
}

//Main Game process
document.onkeyup = function(event){
    
    //dedect the enter key to start the game
    if(event.key === "Enter" && gameOver === true){
        document.querySelector("#game").scrollIntoView({
            behavior: 'smooth'
        });
        //startgame
        startGame();
        gameOver = false;
    }

    // Converts all key clicks to lowercase letters.
    letterGuessed = String.fromCharCode(event.which).toUpperCase();

    //check for only valid guesses
    if(validGuess() === true && gameOver === false){

        //check for repeat guess
        if(repeatGuess() === false){

            // Runs the code to check for correct guesses.
            checkLetters(letterGuessed);

            // Runs the code that ends each round.
            Complete();

            //check for end of game
            endGame();

        }
    }


}