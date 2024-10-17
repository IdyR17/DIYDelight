// ViewPlantKits.jsx
import '../App.css';
import '../css/ViewPlantKits.css'; // Import the custom CSS for ViewPlantKits

import React, { useEffect, useState } from 'react';
import { getAllCustomKits, deleteCustomKit } from '../services/CustomKitsAPI';
import { getPlantById, getPotById, getSoilTypeById } from '../services/OptionsAPI'; // Import service functions

const ViewPlantKits = () => {
    const [plantKits, setPlantKits] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPlantKits();
    }, []);

    const fetchPlantKits = async () => {
        try {
            const kits = await getAllCustomKits();
            // Fetch details for each kit
            const detailedKits = await Promise.all(
                kits.map(async (kit) => {
                    const plant = await getPlantById(kit.plant_id);
                    const pot = await getPotById(kit.pot_id);
                    const soil = await getSoilTypeById(kit.soil_id);
                    return {
                        ...kit,
                        plantName: plant.name,
                        potStyle: pot.style,
                        soilType: soil.type
                    };
                })
            );
            setPlantKits(detailedKits);
        } catch (err) {
            setError('Failed to fetch plant kits');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this plant kit?')) {
            return;
        }

        try {
            await deleteCustomKit(id);
            setPlantKits(plantKits.filter(kit => kit.id !== id)); // Update state after deletion
        } catch (err) {
            setError('Failed to delete plant kit');
        }
    };

    return (
        <div className="plant-kits-container">
            <h1>Custom Plant Kits</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="cards-grid">
                {plantKits.map((kit) => (
                    <div className="card" key={kit.id}>
                        <h3>Plant Kit ID: {kit.id}</h3>
                        <p>Plant: {kit.plantName}</p>
                        <p>Pot: {kit.potStyle}</p>
                        <p>Soil: {kit.soilType}</p>
                        <p>Total Price: ${kit.total_price}</p>
                        <div className="card-buttons">
                            <button onClick={() => window.location.href = `/edit/${kit.id}`}>Edit</button>
                            <button onClick={() => window.location.href = `/details/${kit.id}`}>Details</button>
                            <button onClick={() => handleDelete(kit.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="create-button" onClick={() => window.location.href = '/create'}>Create New Plant Kit</button>
        </div>
    );
};

export default ViewPlantKits;
