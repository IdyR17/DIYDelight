const API_URL = '/api/accessories';

export const getAllAccessories = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch accessories');
    }
    return await response.json();
};

export const getAccessoryById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch accessory');
    }
    return await response.json();
};

export const createAccessory = async (accessoryData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accessoryData),
    });
    if (!response.ok) {
        throw new Error('Failed to create accessory');
    }
    return await response.json();
};

export const updateAccessory = async (id, accessoryData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accessoryData),
    });
    if (!response.ok) {
        throw new Error('Failed to update accessory');
    }
    return await response.json();
};

export const deleteAccessory = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete accessory');
    }
    return await response.json();
};
