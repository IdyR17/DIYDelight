// CreatePlantKit.jsx
import React, { useState, useEffect } from 'react';
import { createCustomKit } from '../services/CustomKitsAPI';
import { getAllPlants, getAllPots, getAllSoilTypes } from '../services/OptionsAPI';
import { getAllAccessories } from '../services/AccessoriesAPI';
import '../css/CreatePlantKit.css'; // Import the custom CSS file

const CreatePlantKit = () => {
    const [plantId, setPlantId] = useState('');
    const [potId, setPotId] = useState('');
    const [soilId, setSoilId] = useState('');
    const [selectedAccessories, setSelectedAccessories] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [plants, setPlants] = useState([]);
    const [pots, setPots] = useState([]);
    const [soils, setSoils] = useState([]);
    const [accessories, setAccessories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const plantData = await getAllPlants();
                const potData = await getAllPots();
                const soilData = await getAllSoilTypes();
                const accessoriesData = await getAllAccessories();
                setPlants(plantData);
                setPots(potData);
                setSoils(soilData);
                setAccessories(accessoriesData);
            } catch (err) {
                console.error('Error fetching options:', err);
            }
        };
        fetchData();
    }, []);

    const handleAccessoryChange = (accessoryId) => {
        if (selectedAccessories.includes(accessoryId)) {
            setSelectedAccessories(selectedAccessories.filter(id => id !== accessoryId));
        } else {
            setSelectedAccessories([...selectedAccessories, accessoryId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!plantId || !potId || !soilId || !totalPrice || parseFloat(totalPrice) <= 0) {
            setError('Please fill in all fields and ensure the total price is a positive number.');
            return;
        }
        const kitData = { 
            plant_id: plantId, 
            pot_id: potId, 
            soil_id: soilId, 
            accessories: selectedAccessories, 
            total_price: parseFloat(totalPrice) 
        };
        try {
            await createCustomKit(kitData);
            setSuccess('Plant kit created successfully');
            setPlantId('');
            setPotId('');
            setSoilId('');
            setSelectedAccessories([]);
            setTotalPrice('');
        } catch (err) {
            setError('Failed to create plant kit');
        }
    };

    return (
        <div className='form-container'>
            <h1>Create a Custom Plant Kit</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Plant:</label>
                    <select value={plantId} onChange={(e) => setPlantId(e.target.value)} required>
                        <option value="">Select a plant</option>
                        {plants.map(plant => (
                            <option key={plant.id} value={plant.id}>{plant.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Pot:</label>
                    <select value={potId} onChange={(e) => setPotId(e.target.value)} required>
                        <option value="">Select a pot</option>
                        {pots.map(pot => (
                            <option key={pot.id} value={pot.id}>{pot.style}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Soil:</label>
                    <select value={soilId} onChange={(e) => setSoilId(e.target.value)} required>
                        <option value="">Select soil type</option>
                        {soils.map(soil => (
                            <option key={soil.id} value={soil.id}>{soil.type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Accessories:</label>
                    <div className='accessories-container'>
                        {accessories.map(accessory => (
                            <div key={accessory.id} className='accessory-item'>
                                <input 
                                    type="checkbox" 
                                    id={`accessory-${accessory.id}`}
                                    checked={selectedAccessories.includes(accessory.id)} 
                                    onChange={() => handleAccessoryChange(accessory.id)} 
                                />
                                <span className="custom-checkbox"></span>
                                <label htmlFor={`accessory-${accessory.id}`}>
                                    {accessory.name} (${accessory.price})
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label>Total Price:</label>
                    <input type="number" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} required />
                </div>
                <button type="submit">Create Plant Kit</button>
            </form>
        </div>
    );
};

export default CreatePlantKit;
