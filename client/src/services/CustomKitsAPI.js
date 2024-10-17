const API_URL = '/api/customKits';

export const getAllCustomKits = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch custom kits');
    }
    return await response.json();
};

export const getCustomKitById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch custom kit');
    }
    return await response.json();
};

export const createCustomKit = async (kitData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kitData),
    });
    if (!response.ok) {
        throw new Error('Failed to create custom kit');
    }
    return await response.json();
};

export const updateCustomKit = async (id, kitData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kitData),
    });
    if (!response.ok) {
        throw new Error('Failed to update custom kit');
    }
    return await response.json();
};

export const deleteCustomKit = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete custom kit');
    }
    return await response.json();
};
