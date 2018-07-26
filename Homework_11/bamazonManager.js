// -----------------
//Application part 1
//00 - pre connection and varraibles
//01 - connect to sql
//02 - read products from sql database - function readProducts.
//03 - Query the user for next step from choices.
    //Running this application will:
        //List a set of menu options:
        // View Products for Sale
        // View Low Inventory
        // Add to Inventory
        // Add New Product
//04 - Request database to update inventory
//05 - Request database to add inventory
//06 - main start Application 


// -----------------
//00 - pre connection and varraibles
//require npm libraries
var mysql = require("mysql");
var inquirer = require('inquirer');
var fs = require("fs");
const Tablefy = require("tablefy")

//Pre defeined varriables

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
//01 - connect to sql
//function to connect to Database
function connect(){
connection.connect(function(err) {
    if (err) throw err;
    //console.log(connection)
    console.log("\n------------------------------------------------------------\n")
    console.log("-------------------BAMAZON STORE MANAGER--------------------")
    console.log("\n------------------------------------------------------------\n")

    console.log("\n------------------------------------------------------------\n")
    console.log("      Now connected to database "+connection.config.database+" as User " + connection.threadId);
    console.log("\n------------------------------------------------------------\n")
});
readProducts()
}

// -----------------
//02 - read products from sql database - function readProducts.
function readProducts() {
    
    //console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    //call query application and send database infomation 
    QueryProducts(res)
    });
}

// -----------------
//03 - Query the user for next step from choices.
//Running this application will:
    //List a set of menu options:
    // View Products for Sale
    // View Low Inventory
    // Add to Inventory
    // Add New Product
function QueryProducts(storeInfo) {
    let table = new Tablefy()

    //Initial user question, what task do you wish to perform.
    inquirer.prompt([
        {
            type: 'list',
            name: 'theme',
            message: "Welcome Manager, select from options below.",
            choices: [
                'View Products for Sale', //print out current inventory
                'View Low Investory', //print out those with less than 5 inventory
                'Add to Inventory', // add additional inventory to x product
                'Add New Product', //add brand new product to databse
                'Quit' //exit application
            ]
        }
    ])
    .then(answers =>{
        //console.log(answers)
        // If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
        if(answers.theme === "View Products for Sale"){
            console.log("\n------------------------------------------------------------\n")
            console.log("---------------------PRODUCTS FOR SALE----------------------")
            console.log("\n------------------------------------------------------------\n")

            //draw table with inventory
            table.draw(storeInfo)
            console.log("\n\n\n")
            //call function to re-read the database info and user prompt
            readProducts()
        }
        // If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
        else if(answers.theme ==='View Low Investory' ){
            console.log("\n------------------------------------------------------------\n")
            console.log("---------------------VIEW LOW INVENTORY---------------------")
            console.log("\n------------------------------------------------------------\n")
            //console.log(storeInfo)

            for(var i=0;i<storeInfo.length;i++){
                if(storeInfo[i].stock_quantity < 5){
                    console.log("\n     ITEM:       "+storeInfo[i].item_id)
                    console.log("     Product:    "+storeInfo[i].product_name)
                    console.log("     Department: "+storeInfo[i].department_name)
                    console.log("     Price($):   "+storeInfo[i].price)
                    console.log("     Qty:        "+storeInfo[i].stock_quantity)
                    console.log("\n--------------------------------------------------------------") 
                }
            }
            //table.draw(lowInventory)
            //call function to re-read the database info and user prompt
            readProducts()
        }
        // If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
        else if(answers.theme ==='Add to Inventory'){
            console.log("\n------------------------------------------------------------\n")
            console.log("----------------------ADD TO INVENTORY----------------------")
            console.log("\n------------------------------------------------------------\n")
            
            //draw current inventory table for reference
            table.draw(storeInfo)
            console.log("\n\n\n")
            
            //pre defined regex
            var re = /([0-9])/;

            //build array with product names for inquire
            var storeChoices=[]
            for(var i=0;i<storeInfo.length;i++){
                storeChoices.push(storeInfo[i].product_name)
            }  
            //your app should display a prompt that will let the manager "add more" of any item currently in the store          
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'theme',
                    message: "Please select a produt to add inventory.",
                    choices: storeChoices
                },
                {
                    type: "input",
                    name: "units",
                    message: "How many units do you want to add?",
                    validate: function validateUserUnits(units){
                      //console.log(units)
                      //console.log(storeInfo[Ids.Ids-1])
                      //console.log(Ids)
                      if(!re.exec(units)){
                        console.log("Not a valid entry.")
                        return false
                      }
                      else{return true}
                    }
                }

            ]).then(answers=>{
                //console.log(answers)

                //call function to display updated product.
                UpdateProduct(storeInfo, answers)

                //call function to re-read the database info and user prompt
                readProducts()
            })
        }
        // If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
        else if(answers.theme ==='Add New Product'){
            console.log("\n------------------------------------------------------------\n")
            console.log("------------------------ADD PRODUCT-------------------------")
            console.log("\n------------------------------------------------------------\n")
            
             //pre defined regex
             var re = /([0-9])/;
              
            //build array with department names for inquire
            var storeChoices=[]
            for(var i=0;i<storeInfo.length;i++){
                storeChoices.push(storeInfo[i].department_name)
            }  

            //prompt user to add new product
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'product_name',
                    message: "Please indicate the name of the new product."
                    
                },
                {
                    type: 'list',
                    name: 'theme',
                    message: "Please select a product department.",
                    choices: storeChoices
                },
                {
                    type: "input",
                    name: "price",
                    message: "What is the price for the new item?",
                    validate: function validateUserUnits(units){
                      //console.log(units)
                      //console.log(storeInfo[Ids.Ids-1])
                      //console.log(Ids)
                      if(!re.exec(units)){
                        console.log("Not a valid entry.")
                        return false
                      }
                      else{return true}
                    }
                },
                {
                    type: "input",
                    name: "stock_quantity",
                    message: "How many units to add?",
                    validate: function validateUserUnits(units){
                      //console.log(units)
                      //console.log(storeInfo[Ids.Ids-1])
                      //console.log(Ids)
                      if(!re.exec(units)){
                        console.log("Not a valid entry.")
                        return false
                      }
                      else{return true}
                    }
                },

            ]).then(answers=>{
                //console.log(answers)

                //05 call to add to database
                createProduct(storeInfo, answers)
          
                //call function to re-read the database info and user prompt
                readProducts()
            })

        }
        //quit the program
        else if(answers.theme ==='Quit'){
            //exit program
            connection.end()
            process.exit();
        }  
    })
}

// -----------------
//04 - Request database to update inventory
function UpdateProduct(storeInfo, userRequest) {
    //console.log(storeInfo)
   
    var storeIds=''
    for(var i=0;i<storeInfo.length;i++){
        if(userRequest.theme === storeInfo[i].product_name){
            storeIds = storeInfo[i].item_id;
            
        }
    }  
    console.log("\n-----------------------------------------------------------\n")
    console.log("    Adding "+userRequest.units+" "+storeInfo[storeIds-1].product_name);
    console.log("\n-----------------------------------------------------------\n")

    var U = parseInt(userRequest.units)
    var updatedQty = storeInfo[storeIds-1].stock_quantity + U
    //console.log("values"+updatedQty+" = "+storeInfo[storeIds-1].stock_quantity+" + "+U)
    //console.log("Value to increase qty to: "+updatedQty)
    //console.log("Store Item ID to reduce "+ storeInfo[userRequest.Ids-1].item_id)
    
        var query = connection.query(
        
        "UPDATE products SET ? WHERE ?",
        [
            {
            stock_quantity: updatedQty
            },
            {
            item_id: storeInfo[storeIds-1].item_id
            }
        ],
        function(err, res) {
            // logs the actual query being run
            if (err) throw err;
            
            //Once the update goes through, show the customer the total cost of their purchase.
            console.log("\n-----------------------------------------------------------\n")
            console.log("    Update Successful.  You added "+userRequest.units+" "+storeInfo[storeIds-1].product_name)
            console.log("\n-----------------------------------------------------------\n")
            //console.log(JSON.stringify(res) + " products updated!\n");
            // var cost = userRequest.units * storeInfo[userRequest.Ids-1].price
            // console.log("Your total cost is: "+cost)   
        },
    );
}

  // -----------------
//05 - Request database to add inventory
  function createProduct(storeInfo, userRequest) {
    console.log("\n-----------------------------------------------------------\n")
    console.log("    Now adding a new product");
    console.log("\n-----------------------------------------------------------\n")

    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            product_name: userRequest.product_name,
            department_name: userRequest.theme,
            price: userRequest.price,
            stock_quantity: userRequest.stock_quantity
        },
        function(err, res) {
            //Once the update goes through, 
            console.log("\n-----------------------------------------------------------\n")
            console.log("    Update Successful.  You added "+userRequest.stock_quantity+" "+userRequest.product_name)
            console.log("\n-----------------------------------------------------------\n")
        }
    );
}

function Main(){
    //start the connection
    connect()
}
//Start the program
Main()
