//Node packages...
const mysql = require("mysql");
//const inquirer = require("inquirer");
//const table = require("cli-table");
//const colors = require("colors");
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
    console.log(`connected as id ${connection.threadId}`);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        res.forEach(res =>
            console.log(`${res.id} | ${res.product_name} | ${res.department_name} | $${res.price} | ${res.stock_quantity}`))
    })
    connection.end();
}