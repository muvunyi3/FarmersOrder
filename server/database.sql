CREATE DATABASE farmersdb;

CREATE TABLE farmers (
  farmer_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  age INT NOT NULL,
  address VARCHAR(255)
);

CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  quantity INT NOT NULL
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  farmer_id INT NOT NULL REFERENCES farmers(farmer_id),
  order_date DATE NOT NULL DEFAULT CURRENT_DATE,
  land_size DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(20) NOT NULL DEFAULT 'pending',
  shipping_address TEXT NOT NULL,
  CONSTRAINT fk_farmer FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id)
);

CREATE TABLE order_product (
  order_id INT NOT NULL REFERENCES orders(order_id),
  product_id INT NOT NULL REFERENCES products(product_id),
  total_amount DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(order_id)
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE payments (
  payment_id SERIAL PRIMARY KEY,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  order_id INT NOT NULL REFERENCES orders(order_id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(20) NOT NULL DEFAULT 'RWF',
  CONSTRAINT fk_pay_order FOREIGN KEY (order_id) REFERENCES orders(order_id)
);


