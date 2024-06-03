import { Request, Response } from 'express';
import { Order, OrderEntity } from '../entities/order.entity';
const pool = require("../db");


export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM orders');
    const orders = rows.map((order: any) => new OrderEntity(order));
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific order
export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM orders WHERE order_id = $1', [id]);
    const order = rows.length ? new OrderEntity(rows[0]) : null;
    res.json(order);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { farmerId, landSize, shippingAddress, products } = req.body;

  try {
    // Start a transaction
    await pool.query('BEGIN');

    // Insert the new order into the orders table
    const { rows: orderRows } = await pool.query(
      'INSERT INTO orders (farmer_id, land_size, shipping_address) VALUES ($1, $2, $3) RETURNING *',
      [farmerId, landSize, shippingAddress]
    );
    const newOrder = new OrderEntity(orderRows[0]);

    // Insert the order's products into the order_product table
    for (const product of products) {
      const { productId, totalAmount } = product;
      await pool.query(
        'INSERT INTO order_product (order_id, product_id, total_amount) VALUES ($1, $2, $3)',
        [newOrder.orderId, productId, totalAmount]
      );
    }

    // Commit the transaction
    await pool.query('COMMIT');

    res.status(201).json(newOrder);
  } catch (error: any) {
    // Rollback the transaction in case of an error
    await pool.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone, age, address } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE orders SET name = $1, email = $2, phone = $3, age = $4, address = $5  WHERE order_id = $6 RETURNING *',
      [name, email, phone, age, address, id]
    );
    const order = rows.length ? new OrderEntity(rows[0]) : null;
    res.json(order);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM orders WHERE order_id = $1', [id]);
    const message = rowCount !== 0 ? `Order ID ${id} Successfully deleted` : 'Operation Failed';
    const code = rowCount !== 0 ? `00` : '01';
    res.json({ "code": code, "message": message});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
