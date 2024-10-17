const API_URL = '/api/pots';

export const getAllPots = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch pots');
    }
    return await response.json();
};

export const getPotById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch pot');
    }
    return await response.json();
};

export const createPot = async (potData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(potData),
    });
    if (!response.ok) {
        throw new Error('Failed to create pot');
    }
    return await response.json();
};

export const updatePot = async (id, potData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(potData),
    });
    if (!response.ok) {
        throw new Error('Failed to update pot');
    }
    return await response.json();
};

export const deletePot = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete pot');
    }
    return await response.json();
};
