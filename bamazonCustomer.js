var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "anam1996!",
    database: "bamazonApp_db"
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("Connected as ID " + connection.threadId + "\n");
    displayProducts();
});

var productID = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var userPick;
var priceofProduct;
var stockQuantity;
var newQuantity;
var totalCost;
var grandTotal = 0;


function displayProducts() {
    console.log("Welcome to Bamazon!");
    var query = "SELECT * FROM products";
    connection.query(query, function (error, response) {
        if (error) throw error;
        console.log("Here are our top 10 best sellers!\n\n");
        for (var i = 0; i < 1; i++) {
            console.table(response);
            // ("ID: " + response[i].item_id + " | " + " Product Name: " + response[i].product_name + " | " + " Department Name: " + response[i].department_name + " | " + " Price: $" + response[i].price + "\n");
        }
        chooseProduct();
    })
}


function chooseProduct() {
    inquirer
        .prompt({
            name: "itemID",
            type: "list",
            message: "Please choose the ID of the product that you would like to purchase.",
            choices: productID
        })
        .then(function (answer) {
            var query = "SELECT * FROM products";
            connection.query(query, function (error, response) {
                if (error) throw error;
                for (var i = 0; i < response.length; i++) {
                    if (parseInt(answer.itemID) === response[i].item_id) {
                        console.log("\nGreat pick! The " + response[i].product_name + " is one of our most popular items!");
                        console.log("\n-------------------------------------------------------------------------------\n");
                        console.log("ID: " + response[i].item_id + " | " + " Product Name: " + response[i].product_name + " | " + " Department Name: " + response[i].department_name + " | " + " Price: $" + response[i].price);
                        console.log("\n-------------------------------------------------------------------------------\n");

                        userPick = response[i].product_name;
                        priceofProduct = response[i].price;
                        stockQuantity = response[i].stock_quantity;
                    }
                }
                productQuantity();
            })
        })
}


function productQuantity() {
    inquirer
        .prompt({
            name: "productAmount",
            type: "input",
            message: "How many " + userPick + "'s would you like to purchase at the cost of $" + priceofProduct + "?",
        })
        .then(function (answer) {
            if (answer.productAmount <= stockQuantity) {
                newQuantity = stockQuantity - answer.productAmount;
                totalCost = priceofProduct * answer.productAmount;
                // floatCost = parseFloat(totalCost).toFixed(2);

                grandTotal += totalCost;

                floatGrandTotal = parseFloat(grandTotal).toFixed(2);
                
                console.log("\nThank you for your purchase!\n" + answer.productAmount + " of the " + userPick + "(s) are placed in for an order.");
                updateStock();
            }
            else {
                console.log("\nInsufficient quantity!\nUnfortunately, we only have " + stockQuantity + " of those products in stock.\n");
            }
        })
}

function updateStock() {
    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query,
        [
            {
                stock_quantity: newQuantity
            },
            {
                product_name: userPick
            }
        ], function (error, response) {
            if (error) throw error;
            console.log("\nTotal cost: $" + totalCost + "\nGrand total: $" + floatGrandTotal + "\n"); 
            console.log("There are now " + newQuantity + " of " + userPick + "(s) left in stock.\n");

            inquirer
            .prompt({
                name: "anotherThing",
                type: "confirm",
                message: "Would you like to purchase something else?",
                default: true
            })
            .then(function(answer) {
                if (answer.anotherThing === true) {
                    displayProducts();
                }
                else {
                    console.log("\nYour purchase of $" + grandTotal + " has been successfully placed.\nHave a wonderful day!\n");
                }
            })
        }
    );
}




