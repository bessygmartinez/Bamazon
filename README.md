# Bamazon Node App
#### Created: December 2019
---

## ABOUT BAMAZON
Bamazon is a command line storefront application using Node.js, along with npm packages, and MySQL database backend. There are three different interfaces to choose from: `bamazonCustomer.js`, `bamazonManager.js`, and `bamazonSupervisor.js`.

* :credit_card: `bamazonCustomer.js` - [*Buying Products*](https://github.com/bessygmartinez/Bamazon#bamazoncustomerjs)
  * This interface will allow the user to select a product using the product ID, enter the amount they would like to purchase, and complete the purchase. After completing the purchase, it will display the purchase details, which includes the product ID, quantity ordered, product name, department name, price per item, and the subtotal for the amount of items purchased.
  <br /> <br />
  
  
* :clipboard: `bamazonManager.js` - [*Managing Inventory and Products*](https://github.com/bessygmartinez/Bamazon#bamazonmanagerjs)
  * This interface will allow the user to view the list of products for sale, view any products that have low inventory, update inventory quantity for a product, or add a new product.
  <br /> <br />
  
* :chart_with_upwards_trend: `bamazonSupervisor.js` - [*View Overhead Costs, Product Sales, and Total Profit by Dept. or Create New Dept.*](https://github.com/bessygmartinez/Bamazon#bamazonsupervisorjs)
  * This interface will allow the user to view overhead costs, product sales, and total profit per department or create a new department.

---

## BEFORE USING BAMAZON
* Begin by cloning this repository into a directory of your choice.
* Open your terminal, such as Bash or Integrated Terminal in Visual Code Studio.
* Navigate to the folder where you cloned this repository.
* Run `npm install` in the command line to install the required dependencies.
* Once the dependencies have installed, make sure you have the MySQL Database set up.

### MySQL Database Setup
* In order to run this application, you should have the MySQL database set up on your machine. Visit the [MySQL installation page](https://dev.mysql.com/doc/refman/5.6/en/installing.html "MySQL installation page") to install the version you need for your operating system. Once you have MySQL installed, you will be able to create the Bamazon database and the products table with the SQL schema found in `bamazon.sql`. Run the `bamazon.sql` code inside your MySQL client to populate the database.
* Make sure to configure your environment variables. Your .env file should include:
```
MYSQL_PASSWORD=YOUR_PASSWORD_HERE
```
* Once you have set up the appropriate environment, you are ready to use Bamazon.
---

## USING BAMAZON
## `bamazonCustomer.js`
### :credit_card: Buying Products
  * If `bamazonCustomer.js` is run, the app will:
    * Display a table with products on sale, with their ID, product name, department name, price, and stock quantity.
    * Prompt the user to enter the item ID of the product they would like to buy.
    * Once an item ID is entered, it will prompt the user to enter the quantity they would like to buy.
    * Once the quantity is entered, the purchase is completed and it will display a table with:
      * Item ID, the quantity ordered, product name, department name, price per piece, and the subtotal for the quantity ordered.
    * The database will update the stock quantity accordingly (stock quantity minus the quantity the user ordered).
    * The app will then prompt the user if they would like to try again.
      * If the user chooses "yes/y", then the menu items will be displayed again.
      * If the user chooses "no/n", then the app with display a goodbye message and the app stops running.
        * **Demo:**
     ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonCustomer_Order.gif "bamazonCustomer.js Order")
    
#### Item ID Does Not Exist     
  * If the user enters an item number that does not exist:
    * The app will display a message that the item ID they have entered does not exist.
    * The app will then prompt the user if they would like to try again.
      * If the user chooses "yes/y", then the menu items will be displayed again.
      * If the user chooses "no/n", then the app with display a goodbye message and the app stops running.
          * **Demo:**
     ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonCustomer_ItemNotExist.gif "bamazonCustomer.js Item Doesn't Exist")    
     
#### Not Enough Stock     
  * If the user enters a quantity that is above the quantity in stock:
    * The app will display a message to let the user know that there is not enough stock in inventory.
    * The app will ask the user to modify their quantity.
    * The app will prompt to enter the item ID again.
    * Once the item ID is entered, it will prompt to enter the quantity.
    * Once the quantity is entered, the purchase is completed and it will display a table with:
      * Item ID, the quantity ordered, product name, department name, price per piece, and the subtotal for the quantity ordered.
    * The database will update the stock quantity accordingly (stock quantity minus the quantity the user ordered).
    * The app will then prompt the user if they would like to try again.
      * If the user chooses "yes/y", then the menu items will be displayed again.
      * If the user chooses "no/n", then the app with display a goodbye message and the app stops running. 
        * **Demo:**
     ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonCustomer_NotEnoughStock.gif "bamazonCustomer.js Not Enough Stock")
---
     
## `bamazonManager.js`
### :clipboard: Managing Inventory and Products
If `bamazonManager.js` is run, the app will prompt the user to choose from the following four options:

#### View Products for Sale
  * If the user chooses `View Products for Sale`, the app will display a table with all products in the database with the following information:
    * Product ID
    * Product Name
    * Department Name
    * Price
    * Stock quantity
      * **Demo:**
      ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonManager_ViewProd.gif "bamazonManager.js View Products")
      
#### View Low Inventory
 * If the user chooses `View Low Inventory`, the app will display a table with all products in the database that have stock with quantities less than 10.
   * If there are no products that have stock with quantities less than 10, the table will return empty.
   * The app will then prompt the user if they would like to try again.
   * If the user chooses "yes/y", then the menu items will be displayed again.
   * If the user chooses "no/n", then the app with display a goodbye message and the app stops running. 
      * **Demo:**
  ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonManager_ViewLowInv.gif "bamazonManager.js View Low Inventory")
  
#### Update Product Quantity
 * If the user chooses `Update Product Quantity`, the user will be given the opportunity to update the quantity in stock for a product.
   * The app will prompt the user to enter the product ID they would like to update.
   * After a product ID is entered, it will prompt the user to enter the updated quantity.
   * The app will then update the quantity in stock on the database and prompt the user that the item ID they have entered has been updated.
   * The app will then prompt the user if they would like to try again.
   * If the user chooses "yes/y", then the menu items will be displayed again.
   * If the user chooses "no/n", then the app with display a goodbye message and the app stops running. 
      * **Demo:**
  ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonManager_UpdateProdQty.gif "bamazonManager.js Update Product Inventory")
  
#### Add New Product
 * If the user chooses `Add New Product`, the user will be given the opportunity to add a new product to Bamazon.
   * The app will prompt the user to enter the product name they would like to add.
   * After a product name is entered, it will prompt the user to enter the department name where the product is.
   * After the department name is entered, the app will prompt to enter the price per piece of the product.
   * Once the price per piece is entered, it will prompt to enter the stock quantity for the product.
   * The app will then update the database with the new product, prompt the user that the product has been added, and will display a table with the information that was entered by the user.
   * Then it will prompt the user if they would like to try again.
    * If the user chooses "yes/y", then the menu items will be displayed again.
    * If the user chooses "no/n", then the app with display a goodbye message and the app stops running. 
      * **Demo:**
  ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonManager_AddNewProd.gif "bamazonManager.js Add New Product")
---

## `bamazonSupervisor.js`
### :chart_with_upwards_trend: View Overhead Costs, Product Sales, and Total Profit by Dept. or Create New Dept.
If `bamazonSupervisor.js` is run, the app will prompt the user to choose from the following two options:

#### View Product Sales by Department
* If the user chooses `View Product Sales by Department`, the app will display a table listing all the departments in the database with the following information:
   * Department ID, Department Name, Overhead Costs, Product Sales, and Total Profit.
   * The app will retrieve the product sales per department and display the sum.
   * It will also display the total profit by subtracting the product sales from the overhead costs.
   * The app will then prompt the user if they would like to try again.
   * If the user chooses "yes/y", then the menu items will be displayed again.
   * If the user chooses "no/n", then the app with display a goodbye message and the app stops running. 
      * **Demo:**
  ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonSupervisor_ViewProdSales.gif "bamazonSupervisor.js View Product Sales")
  
#### Create New Department
 * If the user chooses `Create New Department`, the user will be given the opportunity to create a new department to Bamazon.
   * The app will prompt the user to enter the name of the department they would like to create.
   * After a department name is entered, it will prompt the user to enter the overhead costs.
   * The app will then update the database with the new department, prompt the user that the department has been added, and will display a table with the information that was entered by the user.
   * Then it will prompt the user if they would like to try again.
    * If the user chooses "yes/y", then the menu items will be displayed again.
    * If the user chooses "no/n", then the app with display a goodbye message and the app stops running. 
      * **Demo:**
  ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonSupervisor_AddNewDept.gif "bamazonSupervisor.js Create New Department")
---
    
## TECHNOLOGIES USED
  * [JavaScript](https://www.javascript.com/)
  * [Node.js](https://nodejs.org/en/)
      * Node packages:
        * [mysql](https://www.npmjs.com/package/mysql)
        * [inquirer](https://www.npmjs.com/package/inquirer)
        * [cli-table](https://www.npmjs.com/package/cli-table)
        * [colors](https://www.npmjs.com/package/colors)
        * [dotenv](https://www.npmjs.com/package/dotenv)
