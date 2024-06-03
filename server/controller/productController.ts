import { Request, Response } from 'express';
import { Product, ProductEntity } from '../entities/product.entity';
const pool = require("../db");


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    const products = rows.map((product: any) => new ProductEntity(product));
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific product
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
    const product = rows.length ? new ProductEntity(rows[0]) : null;
    res.json(product);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, quantity } = req.body;
    console.log(`req.body ${name}`);
    const newProduct = await pool.query(
      "INSERT INTO products (name, description, quantity) VALUES($1, $2, $3) RETURNING *",
      [name, description, quantity]
    );

    const product = new ProductEntity(newProduct.rows[0]);
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, quantity } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE products SET name = $1, description = $2, quantity = $3 WHERE product_id = $4 RETURNING *',
      [name, description, quantity, id]
    );
    const product = rows.length ? new ProductEntity(rows[0]) : null;
    res.json(product);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM products WHERE product_id = $1', [id]);
    const message = rowCount !== 0 ? `Product ID ${id} Successfully deleted` : 'Operation Failed';
    const code = rowCount !== 0 ? `00` : '01';
    res.json({ "code": code, "message": message});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
