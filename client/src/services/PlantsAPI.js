const API_URL = '/api/plants';

export const getAllPlants = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch plants');
    }
    return await response.json();
};

export const getPlantById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch plant');
    }
    return await response.json();
};

export const createPlant = async (plantData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plantData),
    });
    if (!response.ok) {
        throw new Error('Failed to create plant');
    }
    return await response.json();
};

export const updatePlant = async (id, plantData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plantData),
    });
    if (!response.ok) {
        throw new Error('Failed to update plant');
    }
    return await response.json();
};

export const deletePlant = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete plant');
    }
    return await response.json();
};
