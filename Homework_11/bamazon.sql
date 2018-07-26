DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(55) NULL,
    department_name VARCHAR(55) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("eyePhone", "Electronics", 999.99, 10), ("Telescreen", "Electronics", 0.99, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Protien Bar", "Grocery", 9.99, 8), ("Chips", "Grocery", 4.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Microwave", "Kitchen", 49.99, 7), ("Stove", "Kitchen", 499.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Food", "Pet Supplies", 15.99, 3), ("Cat Litter", "Pet Supplies", 25.99, 1);
