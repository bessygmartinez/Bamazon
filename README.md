# Bamazon Node App
#### Created: December 2019
---

## ABOUT BAMAZON
Bamazon is a command line storefront application using Node.js, along with npm packages, and MySQL database backend. There are three different interfaces to choose from: `bamazonCustomer.js`, `bamazonManager.js`, and `bamazonSupervisor.js`.

* :credit_card: `bamazonCustomer.js` - [*Buying Products*](https://github.com/bessygmartinez/Bamazon/new/master?readme=1#bamazoncustomerjs)
  * This interface will allow the user to select a product using the product ID, enter the amount they would like to purchase, and complete the purchase. After completing the purchase, it will display the purchase details, which includes the product ID, quantity ordered, product name, department name, price per item, and the subtotal for the amount of items purchased.
  <br /> <br />
  
  
* :clipboard: `bamazonManager.js` - [*Managing Inventory and Products*](https://github.com/bessygmartinez/Bamazon/new/master?readme=1#bamazonmanagerjs)
  * This interface will allow the user to view the list of products for sale, view any products that have low inventory, update inventory quantity for a product, and add a new product.
  <br /> <br />
  

* :chart_with_upwards_trend: `bamazonSupervisor.js` - *View Product Sales and Manage Departments*
  * Description to come.
  <br /> <br />
---

## BEFORE USING BAMAZON
* Begin by cloning this repository into a directory of your choice.
* Open your terminal, such as Bash or Integrated Terminal in Visual Code Studio.
* Navigate to the folder where you cloned this repository.
* Run `npm install` in the command line to install the required dependencies.
* Once the dependencies have installed, make sure you have the MySQL Database set up.

### MySQL Database Setup
* In order to run this application, you should have the MySQL database set up on your machine. Visit the [MySQL installation page](https://dev.mysql.com/doc/refman/5.6/en/installing.html "MySQL installation page") to install the version you need for your operating system. Once you have MySQL installed, you will be able to create the Bamazon database and the products table with the SQL schema found in Bamazon.sql. Run this code inside your MySQL client to populate the database, then you will be ready to proceed with running Bamazon.
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
    * The program will then prompt the user if they would like to try again.
      * If the user chooses "yes/y", then the menu items will be displayed again.
      * If the user chooses "no/n", then the program with display a goodbye message and the program stops running.
        * **Example:**
     ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonCustomer_Order.gif "bamazonCustomer.js Order")
    
#### Item ID Does Not Exist     
  * If the user enters an item number that does not exist:
    * The program will display a message that the item ID they have entered does not exist.
    * The program will then prompt the user if they would like to try again.
      * If the user chooses "yes/y", then the menu items will be displayed again.
      * If the user chooses "no/n", then the program with display a goodbye message and the program stops running.
          * **Example:**
     ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonCustomer_ItemNotExist.gif "bamazonCustomer.js Item Doesn't Exist")    
     
#### Not Enough Stock     
  * If the user enters a quantity that is above the quantity in stock:
    * The program will display a message to let the user know that there is not enough stock in inventory.
    * The program will ask the user to modify their quantity.
    * The program will prompt to enter the item ID again.
    * Once the item ID is entered, it will prompt to enter the quantity.
    * Once the quantity is entered, the purchase is completed and it will display a table with:
      * Item ID, the quantity ordered, product name, department name, price per piece, and the subtotal for the quantity ordered.
    * The database will update the stock quantity accordingly (stock quantity minus the quantity the user ordered).
    * The program will then prompt the user if they would like to try again.
      * If the user chooses "yes/y", then the menu items will be displayed again.
      * If the user chooses "no/n", then the program with display a goodbye message and the program stops running. 
        * **Example:**
     ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonCustomer_NotEnoughStock.gif "bamazonCustomer.js Not Enough Stock")
---
     
## `bamazonManager.js`
### :clipboard: Managing Inventory and Products
If `bamazonManager.js` is run, the app will prompt the user to choose from the following four options:

#### View Products for Sale
  * If the user chooses `View Products for Sale`, the program will display a table with all products in the database with the following information:
    * Product ID
    * Product Name
    * Department Name
    * Price
    * Stock quantity
      * **Example:**
      ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonManager_ViewProd.gif "bamazonManager.js View Products")
      
#### View Low Inventory
 * If the user chooses `View Low Inventory`, the program will display a table with all products in the database that have stock with quantities less than 10.
 * If there are no products that have stock with quantities less than 10, the table will return empty.
 * The program will then prompt the user if they would like to try again.
   * If the user chooses "yes/y", then the menu items will be displayed again.
   * If the user chooses "no/n", then the program with display a goodbye message and the program stops running. 
      * **Example:**
  ![alt text](https://raw.githubusercontent.com/bessygmartinez/Bamazon/master/gifs/BamazonManager_ViewLowInv.gif "bamazonManager.js View Low Inventory")

---
    
## TECHNOLOGIES USED
  * JavaScript
  * Node.js
      * Node packages:
        * mysql
        * inquirer
        * cli-table
        * colors
        * dotenv
