import express from 'express';
import { getAllFarmers, getFarmerById, createFarmer, updateFarmer, deleteFarmer } from '../controller/farmerController';

const router:express.Router = express.Router();

// GET all farmers
router.get('/', getAllFarmers);

// GET farmer by ID
router.get('/:id', getFarmerById);

// POST create a new farmer
router.post('/', createFarmer);

// PUT update farmer by ID
router.patch('/:id', updateFarmer);

// DELETE delete farmer by ID
router.delete('/:id', deleteFarmer);


export default router;