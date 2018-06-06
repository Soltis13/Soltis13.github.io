//Game Varriables
var gameOver = true;

var winsCount = 0;
var livesCount = 3;
var guessesRemaining = 10;

var wordArray = ["THREELITTLEPIGS", "OLDMACDONALD", "HUSHLITTLEBABY"];
var randomWord = "";
var dashedWord = [];
var dashedGuesses = [];
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var correctGuesses = "";
var incorrectGuesses = "";
var guessesArray = "";
var currentLetter = "";
var guesses = 0;
var wordToDisplay = [];



//Main Functions

//Generate a new Game State
newGame();

    function newGame() {
        //resetCounters
        resetCounters();
        resetWorld();
        //generate new word
        generateWord(); 
    };

     //reset the current user wins=0 loses=0 and gesses=10
    function resetWorld() {
        winsCount = 0;
        livesCount = 3;

    };

    function resetCounters() {
    //reset of guesses remaining (for game reset , not new game)
        guessesRemaining = 10;
        guesses = 0;
        correctGuesses = "";
        incorrectGuesses = "";
        guessesArray = " ";
        currentLetter = "";
    };

    function generateWord() {
        //Random runber 1 - array length
        var randomNum = Math.random() * wordArray.length;
        randomNum = Math.floor(randomNum);
        //use number to assign random word from word array
        randomWord = wordArray[randomNum];
        console.log("the random word is: " + randomWord);
        //console.log("this length of the random word is:" + randomWord.length);

        //call to show new varriable on screen
        dashedWord = dashWord(randomWord);
        //console.log("The dashedword is " + dashedWord);
        dashedGuesses = dashWord(alphabet);
        //console.log("The dashed alphabet is " + dashedGuesses);
        displayInfo();
    };
  

function dashWord(word) {
    //console.log(word)
    word = word.split("");
    //console.log(word)

    for(var i = 0; i < word.length; i++) {
        if(word[i] === " "){
            word[i] = "     "
        }
        else {

        word[i] = "_ "
        }
     }
     return word
};

//pull word, convert to dashes if neede and display
//convert the dashed words based on the guesses so far.
function unDashTheWord(wordToDisplay, word) {
    //split string

    console.log("The current RandomWord is " + wordToDisplay);
    console.log("Current guesses are: " + guessesArray)
    console.log("random word is: " + randomWord)
    console.log("Current alphabet is " + alphabet)
    console.log("the transferd word is" + word)
    //console.log("The length of the Random word is " + wordToDisplay.length);
    //console.log("The guessesArray is " + guessesArray);
    //console.log("the length of the guesses array is " + guessesArray.length);

    // console.log(wordToDisplay + " " + guessesArray)
    // for(j=0; j < guessesArray.length; j++){
      
    //     for(i=0; i < wordToDisplay.length; i++) {
    //         console.log(wordToDisplay[i] + " " + guessesArray[j])
    //         if(wordToDisplay[i] === guessesArray[j]){
    //             wordToDisplay.splice(i,1,guessesArray[j]);
    //         }
    //         else if(wordToDisplay[i] === " "){
    //             wordToDisplay.splice(i,1,"  ");
    //         }
    //         else {
    //             wordToDisplay.splice(i,1,"_ ");
    //         }
    //     }
    // };
    //console.log(wordToDisplay)
    
    for(i=0; i < word.length; i++){
        if(word[i] === currentLetter){
            wordToDisplay[i] = currentLetter;
        }
    };

    console.log("THe new word is" + wordToDisplay);

    if(word === randomWord){
        guesses++
    }
    
    return wordToDisplay;
    //console.log("spliced word is " + wordToDisplay);
};

//check for valid guess
function validGuess() {
    //console.log("THe currentLetter to checkfor guess is" + currentLetter);
    for(var i=0; i < alphabet.length; i++){
        //console.log(alphabet[i]);
    
         if(currentLetter === alphabet[i]){
             //console.log("the guess of " + currentLetter + " is a validguess" );
             return true
         }
     }
};

//check for repeated guess
function repeatGuess() {
    //console.log("The current Letter is; " + currentLetter)
    for(var i=0; i < guessesArray.length; i++){
        //console.log(guessesArray)
        if(currentLetter === guessesArray[i]){
            return true //this guess has been made
        }
    }
    return false;    
};

//check if the guess matches a letter in the current word.
function guessIsCorrect() {
    for(var i=0; i < randomWord.length; i++){
        //console.log(randomWord)
        //console.log(randomWord[i] + " " + currentLetter)
        if(currentLetter === randomWord[i]){
           // console.log("Was a correctGuess")
            return true
        }
    }
    return false;
};

function uniqueChar(str) {
    var uniql="";
    for (var i=0; i < str.length; i++){
        if(uniql.indexOf(str.charAt(i))==-1){
            uniql += str[i]
        }
    }
    return uniql;
}
//var abc = "abcabc";
//console.log(uniqueChar(abc));

//update the info on the page
function displayInfo(){
    document.getElementById("currentWord").innerHTML = dashedWord;
    document.getElementById("incorrectGuesses").innerHTML = dashedGuesses;
    document.getElementById("winsCount").innerHTML = winsCount;
    document.getElementById("livesCount").innerHTML = livesCount;
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
};


//Key logging for game input
document.onkeyup = function(i) {

    //dedect the enter key to start the game
    if(event.key === "Enter" && gameOver === true){
        document.querySelector("#game").scrollIntoView({
            behavior: 'smooth'
        });
        newGame();
        gameOver = false;
    };

    //capture key input and place in string array
    currentLetter = String.fromCharCode(i.keyCode).toUpperCase();
    //console.log(currentLetter + " key input section");

    //if key press is valid guess
    //console.log("The current validGuess function is " + validGuess());
    if((validGuess() === true && gameOver === false)){
        //console.log("valid guess" + validGuess());
        //console.log(repeatGuess())

        //if key press is not a repeat guess
        if(repeatGuess() === false){
            //console.log("not repeat guess");



            //add current Letter to the list of guesses
            guessesArray += currentLetter;
            //console.log("The letter " + currentLetter + " should be added to guessesArray as " +guessesArray);

            //is this guess correct, match a letter in the current word array?
            //call to update displayed words
            //console.log("The dashed word is " + dashedWord);
            dashedWord = unDashTheWord(dashedWord, randomWord);
            console.log("The dashed word is " + dashedWord);
            //console.log("The dashed alphabet is " + dashedGuesses);
            dashedGuesses = unDashTheWord(dashedGuesses, alphabet);
            console.log("The dashed alphabet is " + dashedGuesses);
            displayInfo();


            //console.log("current status of guessIsCorrect: " + guessIsCorrect())
            if(guessIsCorrect() === true){
                //console.log("correct guess")

                //if yes, add to correct guesses list, update display word to include letter
                correctGuesses += currentLetter;
                //console.log(correctGuesses);
          
 
                    
                
                var newWord = randomWord;
                for(var i = 0; i < newWord.length; i++) {
                    if(newWord[i] === " "){
                        newWord[i] = ""
                    }
                }
                      
                console.log("Word Length " + uniqueChar(newWord).length)
                console.log("Word Length " + uniqueChar(newWord))
                console.log("current guesses made " + guesses)
                  
                if(guesses === uniqueChar(newWord).length) {
                    
                    alert("The word is " + randomWord + "You won!")
                    winsCount++
                    generateWord();
                    resetCounters();

                    
                    return
                }

                
            }
            else if(guessIsCorrect() === false) { //incorrect guess
                //reduce guesses by 1 and add to incorrect gues
                incorrectGuesses += currentLetter;
                guessesRemaining --;

                if(guessesRemaining === 0){
                    
                    livesCount--;
                   
                    alert("The word was: " + randomWord + "Better luck next time.")
                    resetCounters();
                    generateWord();

                    if(livesCount === 0){
                        alert("Game Over")
                        gameOver = true;
                    }
                    
                    return
                }

            }


        }

    }
}
