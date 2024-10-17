import express from 'express';
import {
    getAllSoilTypes,
    getSoilTypeById,
    createSoilType,
    updateSoilType,
    deleteSoilType
} from '../controllers/soilTypesController.js';

const router = express.Router();

router.get('/', getAllSoilTypes);
router.get('/:id', getSoilTypeById);
router.post('/', createSoilType);
router.patch('/:id', updateSoilType);
router.delete('/:id', deleteSoilType);

export default router;
