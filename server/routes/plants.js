import express from 'express';
import {
    getAllPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant
} from '../controllers/plantsController.js';

const router = express.Router();

router.get('/', getAllPlants);
router.get('/:id', getPlantById);
router.post('/', createPlant);
router.patch('/:id', updatePlant);
router.delete('/:id', deletePlant);

export default router;
