## OVERVIEW  

This application is desinged to take a Database crated in mySQL.  It takes this database named Bamazon, a table named Products, and the columes therin.  
The application is setup in to parts, the first is the basic customer interface BamazonCustomer.js and the second is teh BamazonManger.js.  

## FUNCTIONALITY

The customer app works exactly as described in the original instructions. On load, it'll load the table and display all items for sale and the coresponding data for each item. If the table looks odd, try expanding the terminal window a little bit. You'll be prompted for item number and desired quantity.   

The Manager app is a little different.  Like the customer app, it loads the items in the databse on load.  However, it does not have one basic path to buy a product and qty.  This app is setup to allow the user to select different functions to interact with the database.  
The options within the manager include, check inventory, display low inventory iteams (below 5 units), restock inventory levels, and add new inventory.  These commands update the mySQL database in real time using basic CRUD commands.  

##  SETUP

The user needs to have a local instance of mySQL and mySQL workbench running.  Load the .sql file and run to initiate the database.  User name and password is currentlyset to default "root" "root"  

Download the repository and run npm install to create dependencies.

To run  the customer app type 'node bamazonCustomer.js' and follow the prompts in the command line.  
To run the manager app type 'node bamazonManager.js' and follow the prompts int he command line. 
