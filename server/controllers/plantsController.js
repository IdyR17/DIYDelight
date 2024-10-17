import { pool } from '../config/database.js';

// Get all plants
export const getAllPlants = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM Plants');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single plant by ID
export const getPlantById = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query('SELECT * FROM Plants WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Plant not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new plant
export const createPlant = async (req, res) => {
    const { name, light_requirements, water_needs, difficulty_level, image_url, description } = req.body;
    try {
        const results = await pool.query(
            'INSERT INTO Plants (name, light_requirements, water_needs, difficulty_level, image_url, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, light_requirements, water_needs, difficulty_level, image_url, description]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a plant
export const updatePlant = async (req, res) => {
    const { id } = req.params;
    const { name, light_requirements, water_needs, difficulty_level, image_url, description } = req.body;
    try {
        const results = await pool.query(
            'UPDATE Plants SET name = $1, light_requirements = $2, water_needs = $3, difficulty_level = $4, image_url = $5, description = $6 WHERE id = $7 RETURNING *',
            [name, light_requirements, water_needs, difficulty_level, image_url, description, id]
        );
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Plant not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a plant
export const deletePlant = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query('DELETE FROM Plants WHERE id = $1 RETURNING *', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Plant not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
