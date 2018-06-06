

var randomNumber
var totalScore
var wins = 0
var loses = 0
var crystal1, crystal2, crystal3, crystal4
var crystalNumbers = [];
var imageCrystal = 0;



$(document).ready(function(){
    
    newGame();

    function newGame() {
        //reset random number
        //reset total score
        //reset crystal numbers
        resetGame();
    };
    
    function resetGame() {
        //reset random number for user 19 - 120
        randomNumber = randomNumInt(19, 121);
        //reset total score
        totalScore = 0;
        //reset crystalvalues 1-12
        for(i = 0; i < 4; i++ ){
            crystalNumbers[i] = randomNumInt(1,13);
        };
        assignValues();
        updateScores();
        console.log(crystalNumbers);   
    };
    
    function randomNumInt(min, max){ //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        min = Math.ceil(min);//set minimum value
       max = Math.floor(max);//set max value
       return Math.floor(Math.random() * (max - min)) + min; //returns range min =< x < max (does not include max)
    };
    
    function assignValues() {
        //assign each new number from crstalnumber to the images on the HTMl
        // for (var i = 0; i < crystalNumbers.length; i++){
        //     var imageCrystal = $("<img>");
        //     imageCrystal.addClass("crystla-value");
        //     imageCrystal.attr("value", crystalNumbers[i]);
        //     $(".image")
        // }
        
        $(".image1").attr("value",crystalNumbers[0] );
        $(".image2").attr("value",crystalNumbers[1] );
        $(".image3").attr("value",crystalNumbers[2] );
        $(".image4").attr("value",crystalNumbers[3] );
    };
    //console.log($(".image1").attr("value"));
    
    //take the value "from the crystal click" and add if to the total score
    function addValue(value) {
        totalScore += value;
    };

    //updates the HTML value for each based on the variables above
    function updateScores() {
        var style = {
            "font-size": "2em",
            "text-align": "center"
        };
        $("#numberToGuess").html(randomNumber);
        $("#numberToGuess").css(style);
        console.log(totalScore);
        $("#totalScore").html(totalScore);
        $("#totalScore").css(style);
        $("#wins").html(wins);
        $("#wins").css(style);
        $("#loses").html(loses);
        $("#loses").css(style);
    }

    //checks for end of game conditions
    function endOfGame() {
        //player wins if guessed value total is equal to random number
        if(randomNumber === totalScore){
            wins++;
            alert("Congrats!! You Win")
            resetGame()
        }
        //player looses if they go over the random number value
        else if (randomNumber < totalScore){
            loses++;
            alert("You lose!!")
            resetGame();
        }
    }

    // look for clicks on the images 1-4
        $(".image1").on("click", function() {
            var crystal1 = ($(this).attr("value"));
            crystal1 = parseInt(crystal1);
            addValue(crystal1);
            console.log(totalScore);
        });
        $(".image2").on("click", function() {
            var crystal2 = ($(this).attr("value"));
            crystal2 = parseInt(crystal2);
            addValue(crystal2);
            console.log(totalScore);
        });
        $(".image3").on("click", function() {
            var crystal3 = ($(this).attr("value"));
            crystal3 = parseInt(crystal3);
            addValue(crystal3);
            console.log(totalScore);
        });
        $(".image4").on("click", function() {
            var crystal4 = ($(this).attr("value"));
            crystal4 = parseInt(crystal4);
            addValue(crystal4);
            console.log(totalScore);
        });

    //update internals on any image click
    $(".crystal").on("click", function() {
        updateScores();
        console.log(totalScore);
        endOfGame();
    });
});
