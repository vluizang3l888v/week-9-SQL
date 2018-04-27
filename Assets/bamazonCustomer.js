var mysql = require("mysql");
var inquirer = require("inquirer");
//have to do npm install mysql on bash for it go in here. 

// if you get cannotfind module inquirer on bash then do the NPM INSTALL inquirer. 

var connection = mysql.createConnection({
//standard port below. 
host:"localhost",
port:3306,
user: "root",
password: "root",
database:"bamazon"

})

// connect to the mySQL server and SQL database. 
connection.connect(function(err) {
if (err) throw err;
// run the start function after the connection is made to prompt the user
start();

});


//function start will display data. 
function start() { 

        connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
          console.log(res);
          //connection.end();
          //keep DOOR open don't close SQL database connection yet. 
         });
        }



inquirer
.prompt([
    {
        type:"input",
        message:"Tell me the product id you want?",
        name:"The_wanted_ID"
    },
    {
        type:"input",
        message:"How many do you want?",
        name: "Amount_Requested_ID"
        //default not needed. 
        //default:true 

    }

// on top weird variable created from air, that variable will be shoved into results. 
]).then (function(results){
console.log(results); //just show results. 
//connnect to database SQL again to UPDATE changes. 
var quantity = 0;
connection.query(`SELECT stock_quantity FROM products WHERE item_id=${results.The_wanted_ID}`, function(err,result){
    if (err) throw err;
    
    quantity = result;
    
});
// WHAT THE user inputs, i then get something from SQL.
// sql THE CUSTOMER SELECTED THIS. THE order. 

var HIDDEN = quantity - results.The_wanted_ID; 
connection.query(`UPDATE products SET stock_quantity=${HIDDEN} WHERE item_id=${results.The_wanted_ID}`, function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
});

   })
  


   //update the producst, sets stock quantity, now specify which stock auqntity. 





//when application is run it must display all of the items available for sale. 

//link my JS file with mySQL database called bamazon.

//NODE to get information from the table in bamazon, Table name is products. 




//Next step. 
//The app should then prompt users with two messages.

//The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.




