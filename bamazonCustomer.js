//Node packages...
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
require("colors");
require("dotenv").config();
const formatMoney = require('./formatMoney');

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
    inventoryList();
});

function inventoryList() {
    let connQuery = `SELECT * FROM ${process.env.dbTable}`
    connection.query(connQuery, function (err, res) {
        if (err) throw err;
        let table = new Table({
            head: ["ID".green.bold, "PRODUCT NAME".green.bold, "DEPARTMENT".green.bold, "PRICE".green.bold, "IN STOCK".green.bold]
        })
        res.forEach(res => {
            let formattedPrice = formatMoney(`${res.price}`);
            table.push([`${res.id}`, `${res.product_name}`, `${res.department_name}`, `$${formattedPrice}`, `${res.stock_quantity}`])
            })
        bamazonTitle();
        console.log(table.toString())
        inquirer.prompt({
            name: 'selectedID',
            type: 'input',
            message: 'Which item would you like to buy? (Enter Item ID)'
        })
            .then(buyingItem => {
                if (buyingItem.selectedID > res.length | buyingItem.selectedID < 1) {
                    itemNotExist()
                    process.exit(1)
                }
                inquirer.prompt({
                    name: "qtyOrdered",
                    tyep: "input",
                    message: "How many would you like to order?"
                })
                    .then(qty => {
                        let buyQuery = `select * from ${process.env.dbTable} where id = ${buyingItem.selectedID} limit 1`;
                        connection.query(buyQuery, (error, res) => {
                            if (error) throw error
                            let table = new Table({
                                head: ["ID".green.bold, "QTY ORDERED".green.bold, "PRODUCT NAME".green.bold, "DEPARTMENT".green.bold, "PRICE PER".green.bold, "SUBTOTAL".green.bold]
                            })
                            res.forEach(res => {
                                let formattedPrice = formatMoney(`${res.price}`);
                                let subtotal = formatMoney(`${formattedPrice}` * qty.qtyOrdered);
                                if (qty.qtyOrdered > `${res.stock_quantity}`) {
                                    notEnoughStock()
                                } else {
                                    table.push([`${res.id}`, `${qty.qtyOrdered}`, `${res.product_name}`, `${res.department_name}`, `$${formattedPrice}`, `$${subtotal}`])
                                    youJustOrdered()
                                    console.log(table.toString())
                                    let updateTable = `UPDATE ${process.env.dbTable} SET stock_quantity = ${res.stock_quantity - qty.qtyOrdered} where id = ${res.id}`
                                    connection.query(updateTable, (error, res) => {
                                        if (error) throw error
                                        console.log("Inventory has been updated".yellow)
                                    })
                                }
                                connection.end();
                            })
                        })
                    })
            })
    })

}

//Title [Used http://patorjk.com/software/taag for ACSII art]
const bamazonTitle = () => {
    console.log(`
    
                            ██████╗  █████╗ ███╗   ███╗ █████╗ ███████╗ ██████╗ ███╗   ██╗
                            ██╔══██╗██╔══██╗████╗ ████║██╔══██╗╚══███╔╝██╔═══██╗████╗  ██║
                            ██████╔╝███████║██╔████╔██║███████║  ███╔╝ ██║   ██║██╔██╗ ██║
                            ██╔══██╗██╔══██║██║╚██╔╝██║██╔══██║ ███╔╝  ██║   ██║██║╚██╗██║
                            ██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║███████╗╚██████╔╝██║ ╚████║
                            ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝`.cyan);
}

function itemNotExist() {
    console.log(`
    +-+-+-+-+ +-+-+-+ +-+-+-+-+-+-+-+-+-+
         Sorry! Item Does Not Exist.     
    +-+-+-+-+ +-+-+-+ +-+-+-+-+-+-+-+-+-+
   `.brightRed);
}

function notEnoughStock() {
    console.log(`
    +-+-+-+-+ +-+-+-+ +-+-+-+-+-+-+-+-+-+
         Sorry! Not Enough In Stock.     
    +-+-+-+-+ +-+-+-+ +-+-+-+-+-+-+-+-+-+
   `.yellow);
}

function youJustOrdered() {
    console.log(`
    +-+-+-+-+ +-+-+-+ +-+-+-+-+-+-+-+-+-+
       You Just Ordered the Following:   
    +-+-+-+-+ +-+-+-+ +-+-+-+-+-+-+-+-+-+
   `.green);
}