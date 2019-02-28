DROP TABLE IF EXISTS bamazonApp_db;
CREATE DATABASE bamazonApp_db;
USE bamazonApp_db;

CREATE TABLE products (
item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL, 
department_name VARCHAR(100) NOT NULL,
price DECIMAL(6,2) NOT NULL,
stock_quantity INTEGER(10) NULL,
PRIMARY KEY (item_id)
);