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
    'Upate Product Quantity',
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
        message: 'What would you like to do?'.green,
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
            updateTheInventory();
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
        console.log(table.toString());
        tryAgain();
    })
    
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
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
Stock is currently low on these products:        
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n`.bold.brightRed)
            table.push([`${res.id}`, `${res.product_name}`, `${res.department_name}`, `$${formattedPrice}`, `${res.stock_quantity}`])
        })
        console.log(table.toString());
        tryAgain();
    })
    
};

const updateTheInventory = () => {
    let questions = [{
        name: 'id', 
        type: 'input',
        message: 'Enter product ID you would like to update:'.green
    }, {
        name: 'qty',
        type: 'input', 
        message: 'Enter the new quantity for this product:'.green
    }]
    const updateInventory = (answers) => {
        let updateQuery = `UPDATE ${process.env.dbTable} SET stock_quantity = ${answers.qty} where ID = ${answers.id}`
        connection.query(updateQuery, (err, res) => {
            if (err) throw err;
            console.log(`
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+
Inventory for product ID #${answers.id} has been updated!
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+\n`.bold.brightCyan);
tryAgain();
        })
        
    }
    inquirer.prompt(questions).then(updateInventory);
};

const addNewProduct = () => {
    let questions = [{
        name: 'productName',
        type: 'input',
        message: 'Enter the name of the product you would like to add:'.green
    }, {
        name: 'deptName',
        type: 'input',
        message: 'Enter the department where this product will be stored:'.green
    }, {
        name: 'productPrice',
        type: 'input',
        message: 'Enter the price of this product:'.green
    }, {
        name: 'productStock',
        type: 'input',
        message: 'Enter the quantity of stock for this item:'.green
    }]
    const newProductAddition = (answers) => {
        let addQuery = `INSERT INTO ${process.env.dbTable} (product_name, department_name, price, stock_quantity) VALUES ("${answers.productName}", "${answers.deptName}", "${answers.productPrice}", "${answers.productStock}")`
        connection.query(addQuery, (err, res) => {
            if (err) throw err;
            
        })
        connection.query(`${connQuery} WHERE product_name = "${answers.productName}"`, (err, res) => {
            if (err) throw err;
            let table = new Table({
                head: ["ID".green.bold, "PRODUCT NAME".green.bold, "DEPARTMENT".green.bold, "PRICE".green.bold, "IN STOCK".green.bold]
            })
            let formattedPrice = formatMoney(`${res[0].price}`);
            console.log(`
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  The following product has been added:      
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n`.bold.yellow)
            table.push([`${res[0].id}`, `${res[0].product_name}`, `${res[0].department_name}`, `$${formattedPrice}`, `${res[0].stock_quantity}\n`])
            console.log(table.toString());
            tryAgain();
        })
        
    }
    inquirer.prompt(questions).then(newProductAddition);
};

const tryAgain = () => {
    inquirer.prompt ({
        name: "tryAgain",
        type: "confirm",
        message: "Would you like to do anyting else?".green
    })
    .then(function(user) {
        if (user.tryAgain == true) {
            menuList();
        } else {
            console.log(`
████████╗██╗  ██╗ █████╗ ███╗   ██╗██╗  ██╗    ██╗   ██╗ ██████╗ ██╗   ██╗   
╚══██╔══╝██║  ██║██╔══██╗████╗  ██║██║ ██╔╝    ╚██╗ ██╔╝██╔═══██╗██║   ██║   
   ██║   ███████║███████║██╔██╗ ██║█████╔╝      ╚████╔╝ ██║   ██║██║   ██║   
   ██║   ██╔══██║██╔══██║██║╚██╗██║██╔═██╗       ╚██╔╝  ██║   ██║██║   ██║   
   ██║   ██║  ██║██║  ██║██║ ╚████║██║  ██╗       ██║   ╚██████╔╝╚██████╔╝██╗
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝       ╚═╝    ╚═════╝  ╚═════╝ ╚═╝
                                                                                         
 ██████╗  ██████╗  ██████╗ ██████╗ ██████╗ ██╗   ██╗███████╗██╗              
██╔════╝ ██╔═══██╗██╔═══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝██╔════╝██║              
██║  ███╗██║   ██║██║   ██║██║  ██║██████╔╝ ╚████╔╝ █████╗  ██║              
██║   ██║██║   ██║██║   ██║██║  ██║██╔══██╗  ╚██╔╝  ██╔══╝  ╚═╝              
╚██████╔╝╚██████╔╝╚██████╔╝██████╔╝██████╔╝   ██║   ███████╗██╗              
 ╚═════╝  ╚═════╝  ╚═════╝ ╚═════╝ ╚═════╝    ╚═╝   ╚══════╝╚═╝\n`.cyan)
            process.exit(1);
            connection.end();
        }
    })
 }

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