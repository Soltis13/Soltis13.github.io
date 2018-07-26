// -----------------
//Application part 1
//00 - pre connection and varraibles
//01 - connect to sql
//02 - read products from sql database - function readProducts.
//03 - prompt the user for input to buy from database
//04 - Request from the database to update inventory
//05 - start application

// -----------------
//00 - pre connection and varraibles
//require npm libraries
var mysql = require("mysql");
var inquirer = require('inquirer');
var fs = require("fs");
const Tablefy = require("tablefy")

//Pre defeined varriables
var productIds = [];

//connect to database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });


// -----------------
//01 - Connect to SQL.  
//Display all of the items available for sale. Include the ids, names, and prices of products for sale.
function connect(){
  connection.connect(function(err) {
    if (err) throw err;
    console.log("\n------------------------------------------------------------\n")
    console.log("-----------------------BAMAZON STORE------------------------")
    console.log("\n------------------------------------------------------------\n")

    console.log("\n------------------------------------------------------------\n")
    console.log("      Now connected to database "+connection.config.database+" as User " + connection.threadId);
    console.log("\n------------------------------------------------------------\n")
  });
  readProducts()
}

// -----------------
//02 - get information from database
function readProducts() {
  console.log("\n\nSelecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    let table = new Tablefy()
    var storeInfo = res
    // Log all results of the SELECT statement
    console.log("\n------------------------------------------------------------\n")
    console.log("            The following are now for sale.")
    console.log("\n------------------------------------------------------------\n\n")
    table.draw(res)

    //alternate method of outputting datbase
      // for(var i=0;i<res.length;i++){
      //   console.log("\n   ITEM:       "+res[i].item_id)
      //   productIds.push(res[i].item_id)
      //   console.log("\n   Product:    "+res[i].product_name)
      //   console.log("\n   Department: "+res[i].department_name)
      //   console.log("\n   Price($):   "+res[i].price)
      //   console.log("\n   Qty:        "+res[i].stock_quantity)
      //   console.log("\n----------------------------------")
      // }

    console.log("\n\n\n")
    //call function to prompt user for input
    UserEntry(productIds, storeInfo)
  });
}

// -----------------
//03 - call function to prompt user for input, buy from database.
function UserEntry(productIds, storeInfo){

  //pre defined regex
  var re = /([0-9])/;

  //prompt user with two messages  
  inquirer.prompt([
    //1. The first should ask them the ID of the product they would like to buy.
    {
      type: "input",
      name: "Ids",
      message: "What product (Product ID) would you like to buy?"     

    },    
    //2. The second message should ask how many units of the product they would like to buy.
    {
      type: "input",
      name: "units",
      message: "How many units do you wish to purchase?",
      validate: function validateUserUnits(units, Ids){
        //console.log(units)
        //console.log(storeInfo[Ids.Ids-1])
        //console.log(Ids)
        if(!re.exec(units)){
          console.log("\n\n  Not a valid entry.\n\n")
          return false
        }//Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
        else if(units>storeInfo[Ids.Ids-1].stock_quantity){
          //console.log(storeInfo)          
          console.log("\n\n  Error. Not enough inventory.  Only "+storeInfo[Ids.Ids-1].stock_quantity+" available.\n\n") 
          return false
        }
        else{return true}
      }
    }
  ]).then(answers =>{
    //console.log(answers)

    //go to function, check store for purchase
    UpdateProduct(productIds, storeInfo, answers)
  })
}

// -----------------
//04 - Request from the database to update inventory
function UpdateProduct(productIds, storeInfo, userRequest) {
  console.log("\n------------------------------------------------------------\n")
  console.log("    Purchasing "+userRequest.units+" "+storeInfo[userRequest.Ids-1].product_name);
  console.log("\n------------------------------------------------------------\n")
  
  var updatedQty = storeInfo[userRequest.Ids-1].stock_quantity - userRequest.units
  //console.log("Value to reduce to: "+updatedQty)
  //console.log("Store Item ID to reduce "+ storeInfo[userRequest.Ids-1].item_id)
  
  var query = connection.query(
    
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: updatedQty
      },
      {
        item_id: storeInfo[userRequest.Ids-1].item_id
      }
    ],
    function(err, res) {
      // logs the actual query being run
      if (err) throw err;
      //However, if your store does have enough of the product, you should fulfill the customer's order.  This means updating the SQL database to reflect the remaining quantity.

      //Once the update goes through, show the customer the total cost of their purchase.
      console.log("\n------------------------------------------------------------\n")
      console.log("    Success, You purchased "+userRequest.units+" "+storeInfo[userRequest.Ids-1].product_name)
      console.log("\n------------------------------------------------------------\n")
      //console.log(JSON.stringify(res) + " products updated!\n");
      var cost = userRequest.units * storeInfo[userRequest.Ids-1].price
      console.log("\n------------------------------------------------------------\n")
      console.log("    Your total cost is: $"+cost)   
      console.log("\n------------------------------------------------------------\n\n\n")
    },
  );
  //end sql connection
  connection.end()
}

// -----------------
//05 - start application
function main(){
  connect()
}
main()

