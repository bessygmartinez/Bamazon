USE bamazon;

CREATE DATABASE bamazon;

CREATE TABLE products (
id INT AUTO_INCREMENT UNIQUE,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2),
stock_quantity INT,
product_sales DECIMAL(10,2) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Watchmen (2019 Edition)", "Books", 14.99, 50, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Nike Women's Ebernon Low Sneaker", "Clothing, Shoes & Jewelry", 48.75, 63, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Blizzard Bay Men's Ugly Christmas Sweater Arms Too Short T-rex", "Clothing, Shoes & Jewelry", 27.99, 32, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Bose QuietComfort 35 II Wireless Bluetooth Headphones", "Electronics", 279.00, 100, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Devacurl No-Poo Original Cleanser, 32oz", "Beauty & Personal Care", 27.00, 87, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Makeup Setting Spray with Organic Green Tea", "Beauty & Personal Care", 12.25, 265, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Mike’s Hot Honey, 12 oz Squeeze Bottle", "Grocery & Gourmet Food", 8.48, 113, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Professor Phardtpounders Colon Cleaner Hot Sauce", "Grocery & Gourmet Food", 9.95, 59, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("KitchenAid 5-Qt. Stand Mixer", "Home & Kitchen", 429.99, 33, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Nespresso Original Espresso Machine", "Home & Kitchen", 164.99, 52, 0);

CREATE TABLE departments (
department_id INT AUTO_INCREMENT UNIQUE,
department_name VARCHAR(100) NOT NULL,
over_head_costs DECIMAL(10,2),
total_sales DECIMAL(10,2),
total_profit DECIMAL(10,2),
PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Books', 300)
, ('Clothing, Shoes & Jewelry', 1000)
, ('Electronics', 3000)
, ('Beauty & Personal Care', 800)
, ('Grocery & Gourmet Food', 937)
, ('Home & Kitchen', 1640);

drop table departments;
drop table products;

select * from departments;