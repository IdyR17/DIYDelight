const API_URL = '/api/soilTypes';

export const getAllSoilTypes = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch soil types');
    }
    return await response.json();
};

export const getSoilTypeById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch soil type');
    }
    return await response.json();
};

export const createSoilType = async (soilData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(soilData),
    });
    if (!response.ok) {
        throw new Error('Failed to create soil type');
    }
    return await response.json();
};

export const updateSoilType = async (id, soilData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(soilData),
    });
    if (!response.ok) {
        throw new Error('Failed to update soil type');
    }
    return await response.json();
};

export const deleteSoilType = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete soil type');
    }
    return await response.json();
};
