import { pool } from '../config/database.js';

// Get all custom kits
export const getAllCustomKits = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM CustomKits');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single custom kit by ID
export const getCustomKitById = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query('SELECT * FROM CustomKits WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Custom kit not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new custom kit
export const createCustomKit = async (req, res) => {
    const { user_id, plant_id, pot_id, soil_id, accessories, total_price } = req.body;

    // Validate the required fields
    if (!plant_id || !pot_id || !soil_id || !total_price) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    try {
        const results = await pool.query(
            'INSERT INTO CustomKits (user_id, plant_id, pot_id, soil_id, accessories, total_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user_id, plant_id, pot_id, soil_id, JSON.stringify(accessories), total_price]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        console.error('Database error:', error.message); // Log error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a custom kit
export const updateCustomKit = async (req, res) => {
    const { id } = req.params;
    const { user_id, plant_id, pot_id, soil_id, accessories, total_price } = req.body;
    try {
        const results = await pool.query(
            'UPDATE CustomKits SET user_id = $1, plant_id = $2, pot_id = $3, soil_id = $4, accessories = $5, total_price = $6 WHERE id = $7 RETURNING *',
            [user_id, plant_id, pot_id, soil_id, JSON.stringify(accessories), total_price, id]
        );
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Custom kit not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a custom kit
export const deleteCustomKit = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query('DELETE FROM CustomKits WHERE id = $1 RETURNING *', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Custom kit not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
