import express from 'express';
import {
    getAllPots,
    getPotById,
    createPot,
    updatePot,
    deletePot
} from '../controllers/potsController.js';

const router = express.Router();

router.get('/', getAllPots);
router.get('/:id', getPotById);
router.post('/', createPot);
router.patch('/:id', updatePot);
router.delete('/:id', deletePot);

export default router;
