//Node packages...
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
require("colors");
require("dotenv").config();
const formatMoney = require('./formatMoney');
const connQuery = `SELECT * FROM ${process.env.dbTable}`;

let menuItems = [
    'View Product Sales by Department',
    'Create New Department'
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
    bamazonSupervisorTitle();
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
            viewProductSales();
            break;

        case menuItems[1]:
            createNewDept();
            break;
    };
};

const viewProductSales = () => {
    query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(product_sales) AS product_sales, SUM(product_sales) - departments.over_head_costs AS total_profit FROM departments LEFT JOIN products ON departments.department_name=products.department_name GROUP BY (departments.department_name);"
    connection.query(query, (err, res) => {
        if (err) throw err;
        let table = new Table({
            head: ["DEPARTMENT ID".green.bold, "DEPARTMENT NAME".green.bold, "OVERHEAD COSTS".green.bold, "PRODUCT SALES".green.bold, "TOTAL PROFIT".green.bold]
        })
        res.forEach(res => {
        let overheadCosts = formatMoney(`${res.over_head_costs}`);
        let totalProfit = formatMoney(`${res.total_profit}`);
        let productSales = formatMoney(`${res.product_sales}`)
        table.push([`${res.department_id}`, `${res.department_name}`, `$${overheadCosts}`, `$${productSales}`, `$${totalProfit}`])
        })
        console.log(`
┌─┐┬─┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐  ┌─┐┌─┐┬  ┌─┐┌─┐  ┌┐ ┬ ┬  ┌┬┐┌─┐┌─┐┌┬┐
├─┘├┬┘│ │ │││ ││   │   └─┐├─┤│  ├┤ └─┐  ├┴┐└┬┘   ││├┤ ├─┘ │ 
┴  ┴└─└─┘─┴┘└─┘└─┘ ┴   └─┘┴ ┴┴─┘└─┘└─┘  └─┘ ┴   ─┴┘└─┘┴   ┴o
        `.bold.brightYellow);
        console.log(table.toString());
        console.log('');
        tryAgain();
    })
    
};

const createNewDept = () => {
    let questions = [{
        name: 'deptName',
        type: 'input',
        message: 'Enter the name of the department you would like to add:'.green
    }, {
        name: 'deptOverhead',
        type: 'input',
        message: 'Enter the overhead cost of this department:'.green
    }]
    const newDeptAddition = (answers) => {
        let addQuery = `INSERT INTO departments (department_name, over_head_costs) VALUES ("${answers.deptName}", "${answers.deptOverhead}");`
        connection.query(addQuery, (err, res) => {
            if (err) throw err;
            
        })
        connection.query(`SELECT * FROM departments WHERE department_name = "${answers.deptName}"`, (err, res) => {
            if (err) throw err;
            let table = new Table({
                head: ["DEPARTMENT ID".green.bold, "DEPARTMENT NAME".green.bold, "OVERHEAD COSTS ".green.bold]
            })
            let formattedOverhead = formatMoney(`${answers.deptOverhead}`);
            console.log(`
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 The following department has been added:      
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n`.bold.yellow)
            table.push([`${res[0].department_id}`, `${res[0].department_name}`, `$${formattedOverhead}\n`])
            console.log(table.toString());
            tryAgain();
        })
        
    }
    console.log(`
    
┌─┐┌┬┐┌┬┐  ┌┐┌┌─┐┬ ┬  ┌┬┐┌─┐┌─┐┌┬┐
├─┤ ││ ││  │││├┤ │││   ││├┤ ├─┘ │ 
┴ ┴─┴┘─┴┘  ┘└┘└─┘└┴┘  ─┴┘└─┘┴   ┴o`.bold.brightYellow)
    inquirer.prompt(questions).then(newDeptAddition);
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

const bamazonSupervisorTitle = () => console.log(`


██████╗  █████╗ ███╗   ███╗ █████╗ ███████╗ ██████╗ ███╗   ██╗                
██╔══██╗██╔══██╗████╗ ████║██╔══██╗╚══███╔╝██╔═══██╗████╗  ██║                
██████╔╝███████║██╔████╔██║███████║  ███╔╝ ██║   ██║██╔██╗ ██║                
██╔══██╗██╔══██║██║╚██╔╝██║██╔══██║ ███╔╝  ██║   ██║██║╚██╗██║                
██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║███████╗╚██████╔╝██║ ╚████║                
╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝                
                                                                              
███████╗██╗   ██╗██████╗ ███████╗██████╗ ██╗   ██╗██╗███████╗ ██████╗ ██████╗ 
██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔═══██╗██╔══██╗
███████╗██║   ██║██████╔╝█████╗  ██████╔╝██║   ██║██║███████╗██║   ██║██████╔╝
╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗╚██╗ ██╔╝██║╚════██║██║   ██║██╔══██╗
███████║╚██████╔╝██║     ███████╗██║  ██║ ╚████╔╝ ██║███████║╚██████╔╝██║  ██║
╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝                                                              
`.cyan);