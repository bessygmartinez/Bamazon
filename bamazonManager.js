//Node packages...
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
require("colors");
require("dotenv").config();
const formatMoney = require('./formatMoney');
const connQuery = `SELECT * FROM ${process.env.dbTable}`;

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

const menuList = () => {
    bamazonManagerTitle();
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

const runMenuCommand = (menuItemCommand) => {
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
    };
};

const viewProducts = () => {
    connection.query(connQuery, (err, res) => {
        if (err) throw err;
        let table = new Table({
            head: ["ID".green.bold, "PRODUCT NAME".green.bold, "DEPARTMENT".green.bold, "PRICE".green.bold, "IN STOCK".green.bold]
        })
        res.forEach(res => {
            let formattedPrice = formatMoney(`${res.price}`);
            table.push([`${res.id}`, `${res.product_name}`, `${res.department_name}`, `$${formattedPrice}`, `${res.stock_quantity}`])
        })
        console.log(table.toString())
    })
    connection.end()
};

const viewLowInventory = () => {
    connection.query(`${connQuery} WHERE stock_quantity < 10`, (err, res) => {
        if (err) throw err;
        let table = new Table({
            head: ["ID".green.bold, "PRODUCT NAME".green.bold, "DEPARTMENT".green.bold, "PRICE".green.bold, "IN STOCK".green.bold]
        })
        res.forEach(res => {
            let formattedPrice = formatMoney(`${res.price}`);
            console.log(`
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
Stock is currently low on these items:        
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n`.bold.brightRed)
            table.push([`${res.id}`, `${res.product_name}`, `${res.department_name}`, `$${formattedPrice}`, `${res.stock_quantity}`])
        })
        console.log(table.toString());
    })
    connection.end();
};

const addInventory = () => console.log("Add Inventory");

const addNewProduct = () => console.log("Add New Product");

const bamazonManagerTitle = () => console.log(`

██████╗  █████╗ ███╗   ███╗ █████╗ ███████╗ ██████╗ ███╗   ██╗
██╔══██╗██╔══██╗████╗ ████║██╔══██╗╚══███╔╝██╔═══██╗████╗  ██║
██████╔╝███████║██╔████╔██║███████║  ███╔╝ ██║   ██║██╔██╗ ██║
██╔══██╗██╔══██║██║╚██╔╝██║██╔══██║ ███╔╝  ██║   ██║██║╚██╗██║
██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║███████╗╚██████╔╝██║ ╚████║
╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝
                                                              
███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗██████╗ 
████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██╔══██╗
██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██████╔╝
██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██╗
██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
                                                              
`.cyan);