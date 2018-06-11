(function() {

    //define array of questions
    const myQuestions = [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: {
        a: "javascript",
        b: "js",
        c: "scripting",
        d: "script"
      },
      correctAnswer: "d"
    },
    {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
      answers: {
        a: "script src=xxx.js",
        b: "script name=xxx.js",
        c: "script href=xxx.js" 
      },
      correctAnswer: "a"
    },
    {
    question: "How do you write 'Hello World' in an alert box?",
      answers: {
        a: "alertBox('Hello World')",
        b: "msg('Hello World')",
        c: "msgBox('Hello World')",
        d: "alert('Hello World')"
      },
      correctAnswer: "d"
    },
    {
    question: "How to write an IF statement in JavaScript?",
      answers: {
        a: "if i = 5",
        b: "if i = 5 then",
        c: "if i == 5 then",
        d: "if (i == 5)"
      },
      correctAnswer: "d"
    },
    {
    question: "How can you add a comment in a JavaScript?",
      answers: {
        a: "This is a comment",
        b: "//This is a comment",
        c: "!--This is a comment--"
      },
      correctAnswer: "b"
    },
  ];

  //main function to build the quiz
  function buildQuiz() {
    // Store the HTML output
    var output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      //list of answer choices
      var answers = [];

      // for each answer...
      for (letter in currentQuestion.answers) {
        // HTML radio button
        answers.push(
          `<label><br><input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :  ${currentQuestion.answers[letter]}
              <br></label>`
        );
      }

      // add question and answers 
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} <br></div>
         </div>`
      );
    });

    //combine output list into one string of HTML 
    quizContainer.innerHTML = output.join("");
  }

  //main function to push to html
  function showResults() {

    // gather answers
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
      } else {
        // if answer is wrong or blank
        // color the answers red
        
      }
    });

    // show number of correct answers out of total
   resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  //function to change questions
  function showSlide(n) {
    // remove the active slide 
    slides[currentSlide].classList.remove("active-slide");

    //add the new slide n to the active slide
    slides[n].classList.add("active-slide");

    currentSlide = n;

    //define button functionality - start slide show
    if (startSlide === true) {

        if (currentSlide === 0 ) {
        //previous button nothing 
        previousButton.style.display = "none";
        }
        else {
        previousButton.style.display = "inline-block";
        }

        //define button last slide
        if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
        } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
        }
    } 
    else{
        //previous button nothing 
        previousButton.style.display = "none";
        nextButton.style.display = "none";
    }
  }

  function showNextSlide() {
    //add one to current slide and updates slideshow.
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    //remove one from current slide 
    showSlide(currentSlide - 1);
  }

  //timer function
  //reset counter
  function reset() {

    time = 10;
    openQuestion = true;
          
    $("#timer").html('<h2>'+"Time Remaining: 10"+'<h2>')
  }

  //start counter
  function start() {

    if (clockRunning === false) {
      intervalId = setInterval(count, 1000);
      clockRunning = true;
    }
  }

  //stop counter
  function stop() {
      
    clearInterval(intervalId);
    clockRunning = false;
  }

  //decrease counter
  function count() {
      console.log(time)
  
        time--;
   
      currentTime = timeConverter(time);
  
      $("#timer").html('<h2>' + "Time Remaining: " + currentTime + '<h2>');
  }

  //timer coverter
  function timeConverter(t) {

      
      var minutes = Math.floor(t / 60);
      var seconds = t - (minutes * 60);
  
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
  
      if (minutes === 0) {
        minutes = "";
      }
  
      else if (minutes < 10) {
        minutes = "" + minutes;
      }
  
      return minutes + "" + seconds;
  }

  function startGame(){
    startSlide = true
  }

  // Start game logic - on load click
    //   //document ready
    //   $(document).ready(function() { 
          
        //   $("#start").on('click', function(event){
        //     $(this).hide();  

  //update quiz html 
    var quizContainer = document.getElementById("quiz");
    var resultsContainer = document.getElementById("quiz");
    var submitButton = document.getElementById("submit");

  // display quiz
    var startSlide = true;

    buildQuiz();

  //button html 
    //var startButton = document.getElementById("start");
    var previousButton = document.getElementById("previous");
    var nextButton = document.getElementById("next");
    var slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(0);

    //Start Timer
    //start()  


    // on submit, show results
      submitButton.addEventListener("click", showResults);
      previousButton.addEventListener("click", showPreviousSlide);
      nextButton.addEventListener("click", showNextSlide);

    //stop timer
    //stop()

})();
