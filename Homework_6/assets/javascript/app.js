
//https://developers.giphy.com/docs/

// Initial array of animals
var animals = ["dog", "cat", "rabbit", "hamster"];
var animalImage = [];
var animalImageStill = [];

//ajax request for animal image
function displayAnimalInfo() {

  var animal = $(this).attr("data-name");
  var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=uCLeg25EeeHs21O7Ch1AZ99lwrT9czak&limit=10");

  xhr.done(function(data) {
    console.log("Success got data", data);

  // })
 
  // // Creating an AJAX call for the specific movie button being clicked
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function(data) {

  var results = data.data;


    for(var i = 0; i < results.length; i++){

      var gifDiv = $("<div class='item col-md-3' >");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

     
      animalImage = $("<img>");

      animalImage.attr("src", results[i].images.fixed_height.url);

        //console.log(data.data[i]);

      
      gifDiv.append(p);
      gifDiv.append(animalImage);

      $("#animals-view").prepend(gifDiv);
    }


  });
};

//function to rendering animal buttons
function renderButtons() {

  //delete the prioir animals before adding new
  $("#buttons-view").empty();

  //loop thorugh array of animals
  for (var i = 0; i < animals.length; i++){

    //generate button for each animal in array
    var a = $("<button>");
    //adding class for animal-btn
    a.addClass("animal-btn btn btn-primary ");
    //adding a data-attribute
    a.attr("data-name", animals[i]);
    //providing an initial button text
    a.text(animals[i]);
    //adding the button to the html div
    $("#buttons-view").append(a);
  };
};

//onclick event of button click
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  //grap the input from text box
  var animal = $("#animal-input").val().trim();

  //adding animal from the text box to array of annimals
  animals.push(animal);

  //calling the render button function
  renderButtons();

});

// function to click and still images

//   $(document).on("click", ".item",
//      // function()
//      // {
//      //   var src = $(this).attr("src");
//      //   console.log(src)
//      //   $(this).attr("src", src.replace(/\.png$/i, ".gif"));
//      // },
    
//      function()
//      {
//        console.log(this);

//       var currentImage = this;

//        $(this).children('img').stop();

//        console.log(imageSrc);

//       $(this).children('img').attr("src", imageSrc.replace(/\.gif$/i, ".png"));
//        console.log(this);
//     },
//    )



//Click event on gifs with class of "_Giphy" executes pausePlayGifs function


//onclick event for all animal-btn elements
$(document).on("click", ".animal-btn", displayAnimalInfo);

//call renderbutton to display inital buttons from intial array
renderButtons();