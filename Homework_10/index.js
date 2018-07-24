// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:
var Word = require("./Word");
var inquirer = require('inquirer');

//   * Randomly selects a word and uses the `Word` constructor to store it
//word array
var ListArray = ["Cars",'Food','Coding','Household']
var Cars = ['mercedes','lambo','porshe'];
var Food = ['hamberger','fries','icecream'];
var Coding = ['javascript','mysql','function'];
var Household = ['television','radio','dishwasher'];

//------------
//Index

//GameSection
// 01 - Function: Start Game 
// 02 - Function: Call Word.js to display current word to user
// 03 - Function: Get user input 
// 04 - Function: Check the word if guessed correctly
// 05 - Function: Win and Loose user output functions
// 06 - Call the Start Game function
//Secondary Functions
// 07 - Function: Random Number generator 
// 08 - Function: Draw Hangman
// 09 - Function: Check for repeat guess
//Required Files
//Word.js: creates constructor on genreated word to guess, required letter.js
//Letter.js creates constructor in object of word constructor to generate letters to guess in word to guess


//------------
//Game Section

//01 - function start game
function StartNewGame(){
    //clear variables
    var RandomNumber=0
    var ArrayToGuess=[]
    var WordToGuess=""
    var CurrentGuesses='';
    var WordToGuessString=''
    var WordToGuessArray=[];
    //Welcome the user
    console.log("\n\n")
    console.log("-------------------------------------------------")
    console.log("WELCOME TO THE WORD GUESSING GAME.               ")
    console.log("-------------------------------------------------")
    console.log("\n")
    console.log("-------------------------------------------------")
    console.log("HELLO, I'M THE GAME'S KRAZY VIRTUAL NARRATOR.    ")
    console.log("-------------------------------------------------")
    console.log("\n")
    console.log("-------------------------------------------------")
    console.log("BUT YOU CAN CALL ME KVN. ")
    console.log("-------------------------------------------------")
    console.log("\n")                        
    
    
    //prompt for starting input
    inquirer.prompt([
        {
            type: "input",
            message: "WOULD YOU LIKE TO START A New Game Y/N",
            name: "NewGame",
            validate: function validateUserGuess(name){
                if((name === "n"||name === "no")){
                    process.exit();
                }         
                else if(name === "y"||name === "yes")  {
  
                    return true;
                }       
            }
        },
        {
            type: "list",
            name: 'theme',
            message: '\n\n'+"-------------------------------------------------"+'\nBIG FIRST QUESTION . . .'+"\n-------------------------------------------------"+"\n\n\n"+"-------------------------------------------------"+'\nWHAT CATEGORY DO YOU WISH TO GUESS FROM?'+"\n-------------------------------------------------"+"\n\n",
            choices: ListArray,

        }
    ]).then(answers =>{
        //console.log(answers)
        for(var i=0;i<ListArray.length;i++){
            //console.log(ListArray[i] +" "+answers.theme)
            if(answers.theme=== "Cars"){
                ArrayToGuess = Cars;
            }else if(answers.theme === "Food"){
                ArrayToGuess = Food;
            }else if(answers.theme === "Coding"){
                ArrayToGuess = Coding;
            }else if(answers.theme === "Household"){
                ArrayToGuess = Household;
            }
        }
        var KVN = answers.theme
        KVN=KVN.toUpperCase()
        console.log("\n"+KVN+", AN INTERESTING CHOICE.\n\n")
          
        //word type (choose word array based on criteria)
        //define word to guess as random word from choosen array
        RandomNumber = randomNumInt(0,ArrayToGuess.length)
        WordToGuessString = ArrayToGuess[RandomNumber]
        for(var i=0;i<WordToGuessString.length;i++){
            WordToGuessArray = WordToGuessArray+WordToGuessString[i]+" "
        }
        //console.log(WordToGuess)

        //define guessleft at 6 with new constructed word
        var WordToGuess = new Word(WordToGuessString,6)
        //console.log(WordToGuess)
      
        //function display word
        DisplayWord(WordToGuess,CurrentGuesses,WordToGuessArray) 

    })
}   

//02 - function display current word and guesses left
function DisplayWord(WordToGuess,CurrentGuesses,WordToGuessArray )  {
    console.log("\n\n")
    console.log("-------------------------------------------------")
    console.log("\n\n")
    //hangman
    drawMan(WordToGuess,CurrentGuesses);
    //you have x guess left
    console.log("YOU HAVE ONLY "+WordToGuess.guesses+" GUESSES REMAINING.\n")
    //currrent word is ______ 
    console.log("HERE'S A HINT, THE CURRENT WORD IS: "+WordToGuess.WordDisplay()+"\n")
    //user has already guesses
    //console.log(CurrentGuesses)
    var CGuesses='';
    CGuesses = CurrentGuesses
    CGuesses=CGuesses.split("")
    CGuesses = CGuesses.sort()
    CGuesses = CGuesses.toString()
    console.log("BUT I KNOW YOU'VE ALREADY GUESSED: "+CGuesses+"\n")
    //run function to input guess
    UserGuessInput(WordToGuess,CurrentGuesses,WordToGuessArray)
}

//03 - function to ask user to guess letter 
function UserGuessInput(WordToGuess,CurrentGuesses,WordToGuessArray){
    var re = /([a-z])/;
    inquirer.prompt([
        {
            type: "input",
            message: "Choose a letter",
            name: "UserGuess",
            validate: function validateUserGuess(name){
                //valid guess
                //console.log("\n"+name)
                //console.log(name.length)
                if(!re.exec(name) || name.length!==1){
                    return "Not a valid guess. Choose letters a to z."
                }    //already guessed?
                else if(CheckForGuess(name,CurrentGuesses)=== true){
                    return "You already guessed "+name+", guess again."
                }
                else{return true}
            }
        }      
    ]).then(answers =>{
        //console.log(answers)
        //record guess, 
        CurrentGuesses=CurrentGuesses+answers.UserGuess;

        //check against current newword
        //console.log(WordToGuess)
        //console.log(answers.UserGuess)
        WordToGuess.GuessLetter(answers.UserGuess);
        //console.log(WordToGuess.GuessLetter(answers.UserGuess))
        if(WordToGuess.GuessLetter(answers.UserGuess)===false){
            WordToGuess.guesses = WordToGuess.ReduceGuesses(WordToGuess.guesses)
            //console.log(WordToGuess.guesses)
        }

        //function to check game state
        CheckWord(WordToGuess,CurrentGuesses,WordToGuessArray ) 
    })
}

//04 - funciton check if word is fully guessed or if no guesses left
function CheckWord(WordToGuess,CurrentGuesses,WordToGuessArray) {
    //if no guesses left
    //console.log(WordToGuess.WordDisplay())
    //console.log(WordToGuessArray)
    if(WordToGuess.guesses === 0){
        //run end of game function
        GameOver(WordToGuess,CurrentGuesses)
    }
    //if fully guesses
    else if(WordToGuess.WordDisplay() === WordToGuessArray){
         //run you win function
         YouWin()
    }
    //if guesses left and not fully guessed
    else{
        //run display current word 
        DisplayWord(WordToGuess,CurrentGuesses,WordToGuessArray) 
    }

}      

//05 - functions to end game
function GameOver(WordToGuess,CurrentGuesses){
    console.log("\n")
    drawMan(WordToGuess,CurrentGuesses);
    console.log("\n")
    console.log("-------------------------------------------------")
    console.log("EMBRACE THE KVN")
    console.log("-------------------------------------------------")
    console.log("\n")
    console.log("-------------------------------------------------")
    console.log("Game Over")
    console.log("-------------------------------------------------")
    StartNewGame()
}
function YouWin(){
    console.log("\n")
    console.log("-------------------------------------------------")
    console.log("KVN SAVES THE DAY")
    console.log("-------------------------------------------------")
    console.log("\n")
    console.log("-------------------------------------------------")
    console.log("You Win")
    console.log("-------------------------------------------------")
    StartNewGame()
}

//06 - Start the Game
StartNewGame()


//------------
//Game Add on Functions

//07 - random number 0-4
function randomNumInt(min, max){ //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);//set minimum value
    max = Math.floor(max);//set max value
    return Math.floor(Math.random() * (max - min)) + min; //returns range min =< x < max (does not include max)
};

// 08 - function checks guesses left and draws ascii hangman
function drawMan(WordToGuess,CurrentGuesses) {
	let one = '     ========',
	two =     '        |   |',
	three =   '            |',
	four =    '            |',
	five =    '            |',
	six =     '     ========';
//                  ========
//                     |   | 
//                    ()   |
//                    /|\  |
//                    / \  |
//                  ++++++++ 
	switch( WordToGuess.guesses ) {
		case 6: 
			break;
		case 5: 
			three = '       ()   |   <= IS THIS YOU?';
			break;
		case 4:
			three = '       ()   |    DON"T THINK ITS ME?'   ;
			four =  '        |   |'
			break;
		case 3:
			three = '       ()   |    HMMMMM?';
			four =  '       /|   |'
			break;
		case 2:
			three = '       ()   |';
			four =  '       /|\\  |'
			break;
		case 1:
            
            one =   "     ========  WE'RE ALL GONNA DIE!"
            three = '       ()   |';
			four =  '       /|\\  |';
			five =  '       /    |';
			break;
		case 0:
			three = '       (X)  |';
			four =  '       /|\\  |';
			five =  '       / \\  |';
			break;
	} 
	 console.log( one );
	 console.log( two );
	 console.log( three );
	 console.log( four );
	 console.log( five );
     console.log( six );
     
}

//09 - check teh users guess against the array of currently already guessed letters
function CheckForGuess(guess,CurrentGuesses){
    for(var i=0;i<CurrentGuesses.length;i++){
        if(guess === CurrentGuesses[i]){
            return true
        }
    }
}