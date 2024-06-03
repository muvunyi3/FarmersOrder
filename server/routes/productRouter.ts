import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controller/productController';

const router:express.Router = express.Router();

// GET all Products
router.get('/', getAllProducts);

// GET Product by ID
router.get('/:id', getProductById);

// POST create a new Product
router.post('/', createProduct);

// PUT update Product by ID
router.patch('/:id', updateProduct);

// DELETE delete Product by ID
router.delete('/:id', deleteProduct);


export default router;