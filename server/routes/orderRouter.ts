import express from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controller/orderController';

const router:express.Router = express.Router();

// GET all Orders
router.get('/', getAllOrders);

// GET Order by ID
router.get('/:id', getOrderById);

// POST create a new Order
router.post('/', createOrder);

// PUT update Order by ID
router.patch('/:id', updateOrder);

// DELETE delete Order by ID
router.delete('/:id', deleteOrder);


export default router;