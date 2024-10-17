import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomKitById, updateCustomKit } from '../services/CustomKitsAPI';

const EditPlantKit = () => {
    const { id } = useParams(); // Get the ID from the route parameters
    const [plantId, setPlantId] = useState('');
    const [potId, setPotId] = useState('');
    const [soilId, setSoilId] = useState('');
    const [accessories, setAccessories] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchKitData = async () => {
            try {
                const kit = await getCustomKitById(id);
                setPlantId(kit.plant_id);
                setPotId(kit.pot_id);
                setSoilId(kit.soil_id);
                setAccessories(kit.accessories.join(', '));
                setTotalPrice(kit.total_price);
            } catch (err) {
                setError('Failed to load plant kit data');
            }
        };

        if (id) {
            fetchKitData();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const kitData = { 
            plant_id: plantId, 
            pot_id: potId, 
            soil_id: soilId, 
            accessories: accessories.split(',').map(id => id.trim()), 
            total_price: parseFloat(totalPrice) 
        };

        try {
            await updateCustomKit(id, kitData);
            setSuccess('Plant kit updated successfully');
        } catch (err) {
            setError('Failed to update plant kit');
        }
    };

    return (
        <div>
            <h1>Edit Plant Kit</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Plant ID:</label>
                    <input type="text" value={plantId} onChange={(e) => setPlantId(e.target.value)} required />
                </div>
                <div>
                    <label>Pot ID:</label>
                    <input type="text" value={potId} onChange={(e) => setPotId(e.target.value)} required />
                </div>
                <div>
                    <label>Soil ID:</label>
                    <input type="text" value={soilId} onChange={(e) => setSoilId(e.target.value)} required />
                </div>
                <div>
                    <label>Accessories (comma-separated IDs):</label>
                    <input type="text" value={accessories} onChange={(e) => setAccessories(e.target.value)} />
                </div>
                <div>
                    <label>Total Price:</label>
                    <input type="number" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} required />
                </div>
                <button type="submit">Update Plant Kit</button>
            </form>
        </div>
    );
};

export default EditPlantKit;
