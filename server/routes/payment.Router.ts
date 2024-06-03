import express from 'express';
import { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment } from '../controller/paymentController';

const router:express.Router = express.Router();

// GET all Payments
router.get('/', getAllPayments);

// GET Payment by ID
router.get('/:id', getPaymentById);

// POST create a new Payment
router.post('/', createPayment);

// PUT update Payment by ID
router.patch('/:id', updatePayment);

// DELETE delete Payment by ID
router.delete('/:id', deletePayment);


export default router;