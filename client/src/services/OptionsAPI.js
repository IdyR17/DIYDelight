// OptionsAPI.js
import axios from 'axios';

// Function to get all plants
export const getAllPlants = async () => {
    const response = await axios.get('/api/plants');
    return response.data;
};

// Function to get a plant by ID
export const getPlantById = async (id) => {
    const response = await axios.get(`/api/plants/${id}`);
    return response.data;
};

// Function to get all pots
export const getAllPots = async () => {
    const response = await axios.get('/api/pots');
    return response.data;
};

// Function to get a pot by ID
export const getPotById = async (id) => {
    const response = await axios.get(`/api/pots/${id}`);
    return response.data;
};

// Function to get all soil types
export const getAllSoilTypes = async () => {
    const response = await axios.get('/api/soilTypes');
    return response.data;
};

// Function to get a soil type by ID
export const getSoilTypeById = async (id) => {
    const response = await axios.get(`/api/soilTypes/${id}`);
    return response.data;
};
export const getAccessoryById = async (id) => {
    const response = await axios.get(`/api/accessories/${id}`);
    return response.data;
};