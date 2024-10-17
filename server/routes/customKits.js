import express from 'express';
import {
    getAllCustomKits,
    getCustomKitById,
    createCustomKit,
    updateCustomKit,
    deleteCustomKit
} from '../controllers/customKitsController.js';

const router = express.Router();

router.get('/', getAllCustomKits);
router.get('/:id', getCustomKitById);
router.post('/', createCustomKit);
router.patch('/:id', updateCustomKit);
router.delete('/:id', deleteCustomKit);

export default router;
