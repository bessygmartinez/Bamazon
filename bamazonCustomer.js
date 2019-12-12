//Node packages...
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
require("colors");
require("dotenv").config();
const formatMoney = require('./formatMoney');
const connQuery = `SELECT * FROM ${process.env.dbTable}`;

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
        console.log(table.toString() + "\n")
        prompts();
    })

}

function prompts() {
    connection.query(connQuery, function(err, res) {
        if (err) throw err;
        inquirer.prompt({
            name: 'selectedID',
            type: 'input',
            message: 'Which item would you like to buy? (Enter Item ID)'.green
        })
            .then(buyingItem => {
                if (buyingItem.selectedID > res.length | buyingItem.selectedID < 1) {
                    itemNotExist()
                } else {
                inquirer.prompt({
                    name: 'qtyOrdered',
                    tyep: 'input',
                    message: 'How many would you like to order?'.green
                }).then(qty => {
                        connection.query(`SELECT * FROM ${process.env.dbTable} WHERE id = ${buyingItem.selectedID}`, (error, res) => {
                            if (error) throw error
                            let table = new Table({
                                head: ["ID".green.bold, "QTY ORDERED".green.bold, "PRODUCT NAME".green.bold, "DEPARTMENT".green.bold, "PRICE PER".green.bold, "SUBTOTAL".green.bold]
                            })
                            res.forEach(res => {
                                let formattedPrice = formatMoney(`${res.price}`);
                                let subtotal = formatMoney(`${formattedPrice}` * qty.qtyOrdered);
                                if (qty.qtyOrdered <= res.stock_quantity) {
                                    table.push([`${res.id}`, `${qty.qtyOrdered}`, `${res.product_name}`, `${res.department_name}`, `$${formattedPrice}`, `$${subtotal}`])
                                    youJustOrdered();
                                    console.log(table.toString())
                                    let updateTable = `UPDATE ${process.env.dbTable} SET stock_quantity = ${res.stock_quantity - qty.qtyOrdered}, product_sales = ${formattedPrice * qty.qtyOrdered} + product_sales WHERE id = ${res.id}`
                                    connection.query(updateTable, (error, res) => {
                                        if (error) throw error
                                        console.log(`
                                        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                                                 Stock has been updated        
                                        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n`.yellow)
                                        tryAgain();
                                    })
                                } else {
                                    notEnoughStock();
                                }
                            })
                        })
                    })}
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
                            ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝\n`.cyan);
}

function itemNotExist() {
    console.log(`
                                        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                                             That item ID does not exist     
                                        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n
   `.brightRed);
   tryAgain();
}

function tryAgain(){
   inquirer.prompt ({
       name: "tryAgain",
       type: "confirm",
       message: "Would you like to try again?".green
   })
   .then(function(user) {
       if (user.tryAgain == true) {
           inventoryList();
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

function notEnoughStock() {
    console.log(`
                                        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                                            Sorry! Not enough in stock.     
                                            Please modify your quantity.
                                        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

   `.yellow);
   prompts();
}

function youJustOrdered() {
    console.log(`
                                        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                                         You have just ordered the following:   
                                        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   `.cyan);
}