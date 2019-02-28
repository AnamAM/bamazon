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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Board Game", "Games", 18.99, 100),
("Nails Manicure Kit", "Beauty", 24.99, 85),
("Pressure Cooker", "Kitchen and Dining", 89.99, 75),
("Virtual Reality Headset", "Electronics", 499.99, 70),
("Infinity Neck Pillow", "Home", 39.99, 100),
("Yoga Mat", "Exercise and Fitness", 24.99, 100),
("Hydration Pack", "Sports and Outdoors", 59.99, 80),
("Travel Organizer", "Travel Accessories", 39.99, 90),
("Portable Charger", "Cellphone Accessories", 17.99, 100),
("Wireless Printer", "Electronics", 69.99,  70);

SELECT * FROM products;
