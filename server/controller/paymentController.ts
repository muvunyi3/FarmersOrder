import { Request, Response } from 'express';
import { Payment, PaymentEntity } from '../entities/payment.entity';
const pool = require("../db");


export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM payments');
    const payments = rows.map((payment: any) => new PaymentEntity(payment));
    res.json(payments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific payment
export const getPaymentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM payments WHERE payment_id = $1', [id]);
    const payment = rows.length ? new PaymentEntity(rows[0]) : null;
    res.json(payment);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { amount, currency,  payment_date, order_Id  } = req.body;
    const newPayment = await pool.query(
      "INSERT INTO payments (amount, currency,  payment_date, order_Id) VALUES($1, $2, $3, $4) RETURNING *",
      [amount, currency,  payment_date, order_Id]
    );

    const payment = new PaymentEntity(newPayment.rows[0]);
    res.json(payment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePayment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, currency,  payment_date, order_Id} = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE payments SET amount = $1, currency = $2, payment_date = $3, order_Id = $4 WHERE payment_id = $5 RETURNING *',
      [amount, currency,  payment_date, order_Id, id]
    );
    const payment = rows.length ? new PaymentEntity(rows[0]) : null;
    res.json(payment);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM payments WHERE payment_id = $1', [id]);
    const message = rowCount !== 0 ? `Payment ID ${id} Successfully deleted` : 'Operation Failed';
    const code = rowCount !== 0 ? `00` : '01';
    res.json({ "code": code, "message": message});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
