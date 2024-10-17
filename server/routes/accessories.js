import express from 'express';
import {
    getAllAccessories,
    getAccessoryById,
    createAccessory,
    updateAccessory,
    deleteAccessory
} from '../controllers/accessoriesController.js';

const router = express.Router();

router.get('/', getAllAccessories);
router.get('/:id', getAccessoryById);
router.post('/', createAccessory);
router.patch('/:id', updateAccessory);
router.delete('/:id', deleteAccessory);

export default router;
