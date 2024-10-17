// PlantKitDetails.jsx
import '../App.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomKitById } from '../services/CustomKitsAPI';
import { getPlantById, getPotById, getSoilTypeById, getAccessoryById } from '../services/OptionsAPI';

const PlantKitDetails = () => {
    const { id } = useParams();
    const [plantKit, setPlantKit] = useState(null);
    const [plantDetails, setPlantDetails] = useState(null);
    const [potDetails, setPotDetails] = useState(null);
    const [soilDetails, setSoilDetails] = useState(null);
    const [accessoryDetails, setAccessoryDetails] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchPlantKitDetails(id);
        }
    }, [id]);

    const fetchPlantKitDetails = async (kitId) => {
        try {
            const data = await getCustomKitById(kitId);
            setPlantKit(data);
            await fetchAdditionalDetails(data);
        } catch (err) {
            setError('Failed to fetch plant kit details');
        }
    };

    const fetchAdditionalDetails = async (kit) => {
        try {
            const plant = await getPlantById(kit.plant_id);
            const pot = await getPotById(kit.pot_id);
            const soil = await getSoilTypeById(kit.soil_id);

            const accessories = await Promise.all(
                (kit.accessories || []).map(async (accId) => await getAccessoryById(accId))
            );

            setPlantDetails(plant);
            setPotDetails(pot);
            setSoilDetails(soil);
            setAccessoryDetails(accessories);
        } catch (err) {
            setError('Failed to fetch additional details');
        }
    };

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!plantKit || !plantDetails || !potDetails || !soilDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className="details-container">
            <h1>Plant Kit Details</h1>
            <h3>Plant Kit ID: {plantKit.id}</h3>
            <div className="detail-item">
                <h4>Plant:</h4>
                <p>Name: {plantDetails.name}</p>
                <p>Light Requirements: {plantDetails.light_requirements}</p>
                <p>Water Needs: {plantDetails.water_needs}</p>
            </div>
            <div className="detail-item">
                <h4>Pot:</h4>
                <p>Style: {potDetails.style}</p>
                <p>Color: {potDetails.color}</p>
                <p>Material: {potDetails.material}</p>
            </div>
            <div className="detail-item">
                <h4>Soil:</h4>
                <p>Type: {soilDetails.type}</p>
                <p>Description: {soilDetails.description}</p>
            </div>
            <div className="detail-item">
                <h4>Accessories:</h4>
                <ul>
                    {accessoryDetails.length > 0 ? (
                        accessoryDetails.map((accessory, index) => (
                            <li key={index}>{accessory.name} - {accessory.type}</li>
                        ))
                    ) : (
                        <li>None</li>
                    )}
                </ul>
            </div>
            <p>Total Price: ${plantKit.total_price}</p>
        </div>
    );
};

export default PlantKitDetails;
