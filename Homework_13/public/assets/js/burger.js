// Static JS

$(".add-burger").on("click", function(event) {
    // $(".create-form").on("submit", function(event) {
    
      event.preventDefault();
    
      // Add a new burger to the list
      var newBurger = {
        burger_name: $("#burgerInput").val().trim(),
      };
    
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
    
    $(".eat-burger").on("click", function(event) {
      var id = $(this).data("id");
      var eaten = {devoured: true};
    
      console.log(`update id = ${id}`)
    
      // Send the PUT request.
      $.ajax(`/api/burgers/${id}`, {
        type: "PUT",
        data: eaten
      }).then(
        function() {
          console.log("Updated Burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });