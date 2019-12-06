//Node packages...
const mysql = require("mysql");
const inquirer = require("inquirer");
//const Table = require("cli-table");
require("colors");
require("dotenv").config();
//const formatMoney = require('./formatMoney');
//const connQuery = `SELECT * FROM ${process.env.dbTable}`;

let menuItems = [
    'View Products for Sale',
    'View Low Inventory',
    'Add Inventory',
    'Add New Product'
];

//Create connection to bamazon database
const connection = mysql.createConnection({
    host: process.env.dbServer,
    port: process.env.dbPort,
    user: process.env.dbUser,
    password: process.env.dbPass,
    database: process.env.db
});

connection.connect(function (err) {
    if (err) throw err;
    //    console.log(`connected as id ${connection.threadId}`);
    menuList();
});

function menuList() {
    //bamazonManagerTitle();
    inquirer.prompt({
        name: 'menuItemCommand',
        type: 'list',
        message: 'Welcome. What would you like to do?',
        choices: menuItems
    })
    .then(menuSelection => {
        runMenuCommand(menuSelection.menuItemCommand)
    })
};

function runMenuCommand(menuItemCommand) {
    switch (menuItemCommand) {
        case menuItems[0]:
            viewProducts();
            break;

        case menuItems[1]:
            viewLowInventory();
            break;
        
        case menuItems[2]:
            addInventory();
            break;

        case menuItems[3]:
            addNewProduct();
            break;
    }
};

function viewProducts() {
    console.log("View Products");
};

function viewLowInventory() {
    console.log("View Low Inventory");
};

function addInventory() {
    console.log("Add Inventory");
};

function addNewProduct() {
    console.log("Add New Product");
};