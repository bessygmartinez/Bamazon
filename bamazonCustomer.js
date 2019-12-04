//Node packages...
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
const colors = require("colors");
require("dotenv").config();

//Create connection to bamazon database
const connection = mysql.createConnection({
    host: process.env.dbServer,
    port: process.env.dbPort,
    user: process.env.dbUser,
    password: process.env.dbPass,
    database: process.env.db
});

connection.connect(function(err) {
    if (err) throw err;
//    console.log(`connected as id ${connection.threadId}`);
    inventoryList();
});

function inventoryList() {
    let connQuery = `SELECT * FROM ${process.env.dbTable}`
    connection.query(connQuery, function(err, res){
        if (err) throw err;
        let table = new Table({
            head: ["ID", "PRODUCT NAME", "DEPARTMENT", "PRICE", "IN STOCK"]
        })
        res.forEach(res =>
            table.push([`${res.id}`, `${res.product_name}`, `${res.department_name}`, `$${res.price}`, `${res.stock_quantity}`])
            )
            bamazonTitle();
            console.log(table.toString())
            inquirer.prompt({
                name: 'selectedID',
                type: 'input',
                message: 'Which item would you like to buy? (Enter Item ID)'
              })
    })
    connection.end();
}

//Title [Used http://patorjk.com/software/taag for ACSII art]
const bamazonTitle = () => {
    console.log(`
    
██████╗  █████╗ ███╗   ███╗ █████╗ ███████╗ ██████╗ ███╗   ██╗
██╔══██╗██╔══██╗████╗ ████║██╔══██╗╚══███╔╝██╔═══██╗████╗  ██║
██████╔╝███████║██╔████╔██║███████║  ███╔╝ ██║   ██║██╔██╗ ██║
██╔══██╗██╔══██║██║╚██╔╝██║██╔══██║ ███╔╝  ██║   ██║██║╚██╗██║
██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║███████╗╚██████╔╝██║ ╚████║
╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝
                                                              
`.cyan);
}