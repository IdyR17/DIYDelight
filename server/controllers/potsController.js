import { pool } from '../config/database.js';

// Get all pots
export const getAllPots = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM Pots');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single pot by ID
export const getPotById = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query('SELECT * FROM Pots WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Pot not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new pot
export const createPot = async (req, res) => {
    const { style, color, size, material, price, image_url } = req.body;
    try {
        const results = await pool.query(
            'INSERT INTO Pots (style, color, size, material, price, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [style, color, size, material, price, image_url]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a pot
export const updatePot = async (req, res) => {
    const { id } = req.params;
    const { style, color, size, material, price, image_url } = req.body;
    try {
        const results = await pool.query(
            'UPDATE Pots SET style = $1, color = $2, size = $3, material = $4, price = $5, image_url = $6 WHERE id = $7 RETURNING *',
            [style, color, size, material, price, image_url, id]
        );
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Pot not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a pot
export const deletePot = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query('DELETE FROM Pots WHERE id = $1 RETURNING *', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Pot not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
