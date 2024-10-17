import { pool } from '../config/database.js';

// Get all accessories
export const getAllAccessories = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM Accessories');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single accessory by ID
export const getAccessoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query('SELECT * FROM Accessories WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Accessory not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new accessory
export const createAccessory = async (req, res) => {
    const { name, type, description, price, image_url } = req.body;
    try {
        const results = await pool.query(
            'INSERT INTO Accessories (name, type, description, price, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, type, description, price, image_url]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an accessory
export const updateAccessory = async (req, res) => {
    const { id } = req.params;
    const { name, type, description, price, image_url } = req.body;
    try {
        const results = await pool.query(
            'UPDATE Accessories SET name = $1, type = $2, description = $3, price = $4, image_url = $5 WHERE id = $6 RETURNING *',
            [name, type, description, price, image_url, id]
        );
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Accessory not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an accessory
export const deleteAccessory = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query('DELETE FROM Accessories WHERE id = $1 RETURNING *', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Accessory not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
