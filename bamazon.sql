USE bamazon;
SELECT * FROM products;

CREATE DATABASE bamazon;

CREATE TABLE products (
id INT AUTO_INCREMENT NOT NULL UNIQUE,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2),
stock_quantity INT NOT NULL,
PRIMARY KEY (id)
);

DROP TABLE products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Watchmen (2019 Edition)", "Books", 14.99, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nike Women's Ebernon Low Sneaker", "Clothing, Shoes & Jewelry", 48.75, 63);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blizzard Bay Men's Ugly Christmas Sweater Arms Too Short T-rex", "Clothing, Shoes & Jewelry", 27.99, 32);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bose QuietComfort 35 II Wireless Bluetooth Headphones", "Electronics", 279.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Devacurl No-Poo Original Cleanser, 32oz", "Beauty & Personal Care", 27.00, 87);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Makeup Setting Spray with Organic Green Tea", "Beauty & Personal Care", 12.25, 265);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mike’s Hot Honey, 12 oz Squeeze Bottle", "Grocery & Gourmet Food", 8.48, 113);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Professor Phardtpounders Colon Cleaner Hot Sauce", "Grocery & Gourmet Food", 9.95, 59);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("KitchenAid 5-Qt. Stand Mixer", "Home & Kitchen", 429.99, 33);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nespresso Original Espresso Machine", "Home & Kitchen", 164.99, 52);