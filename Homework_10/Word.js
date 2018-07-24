// * **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:
var Letter = require("./Letter");

//new function constructor Word
function Word(newWord,guesses){

    // An array of `new` Letter objects representing the letters of the underlying word
    this.newWord = newWord;
    //console.log(newWord)
    newWord=newWord.split("")
    //console.log(newWord)
    for(var i=0;i<newWord.length;i++){
        var char = new Letter(newWord[i],false)
        newWord[i] = char;
        //console.log(newWord[i]+ " "+char)
    }
    //console.log(newWord)

    //guessesremaining
    this.guesses = guesses;

    //decrease guesses
    this.ReduceGuesses = function(guesses){
        guesses = guesses-1;
        return guesses
    }

    //   * A function that returns a string representing the word. 
    this.WordDisplay = function(){
        //This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.
        var letterArray = ""
        //console.log(newWord)
        for(var i=0;i<newWord.length;i++){
            var nextLetter = newWord[i].LetterValue  
            //console.log(nextLetter)        
            letterArray = letterArray+(newWord[i].LetterDisplay())+" "
            
        }
        //console.log(letterArray)  
        return letterArray
    }

    //   * A function that takes a character as an argument 
    this.GuessLetter = function(guess){
    //and calls the guess function on each letter object (the second function defined in `Letter.js`)
    
        for(var i=0;i<newWord.length;i++){
            //console.log(newWord[i])
            //console.log(guess)
            newWord[i].LetterCheck(guess); 
       
        }
        for(var i=0;i<newWord.length;i++){
            if(newWord[i].LetterCheck(guess)===true){
                return true
            }     
        }
        return false
    }
}
module.exports = Word;