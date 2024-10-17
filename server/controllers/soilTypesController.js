import { pool } from '../config/database.js';

// Get all soil types
export const getAllSoilTypes = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM SoilTypes');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single soil type by ID
export const getSoilTypeById = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query('SELECT * FROM SoilTypes WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Soil type not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new soil type
export const createSoilType = async (req, res) => {
    const { type, description, compatible_plants, price } = req.body;
    try {
        const results = await pool.query(
            'INSERT INTO SoilTypes (type, description, compatible_plants, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [type, description, compatible_plants, price]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a soil type
export const updateSoilType = async (req, res) => {
    const { id } = req.params;
    const { type, description, compatible_plants, price } = req.body;
    try {
        const results = await pool.query(
            'UPDATE SoilTypes SET type = $1, description = $2, compatible_plants = $3, price = $4 WHERE id = $5 RETURNING *',
            [type, description, compatible_plants, price, id]
        );
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Soil type not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a soil type
export const deleteSoilType = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query('DELETE FROM SoilTypes WHERE id = $1 RETURNING *', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Soil type not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
