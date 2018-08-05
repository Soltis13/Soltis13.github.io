
// LOAD DATA
var friendsData = require("../data/friends");
console.log(friendsData)

// ROUTING
module.exports = function(app) {

  // API GET Requests
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  // API POST Requests
  app.post("/api/friends", function(req, res) {
    
    // req.body is available since we're using the body-parser middleware
    console.log(JSON.stringify(req.body) +" "+ res)
    console.log(JSON.stringify(friendsData))
    friendsData.push(req.body);
      res.json(true);
  });


  // ---------------------------------------------------------------------------
  // // clear out the table while working with the functionality
  // app.post("/api/clear", function() {
  //   // Empty out the arrays of data
  //   tableData = [];
  //   waitListData = [];

  //   console.log(tableData);
  // });
};
