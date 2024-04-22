export const createResource = async (user_id, title, description, link, category, endTime) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/health/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, title, description, link, category, endTime }),
    });
    if (!response.ok) {
        const errorResponse = await response.json();
        const error = new Error(errorResponse.error || response.statusText);
        error.name = `HTTP Error ${response.status}`;
        throw error;
    }

    return await response.json();
};

export const deleteResource = async (resourceId, userId) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/health/${resourceId}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const errorResponse = await response.json();
        const error = new Error(errorResponse.error || response.statusText);
        error.name = `HTTP Error ${response.status}`;
        throw error;
    }

    return await response.json();
};

export const modifyResource = async (resourceId: number, userId: number, title: string, description: string, link: string, category: string, endTime: Date): Promise<Resource> => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/health/${resourceId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, title, description, link, category, endTime }),
    });
    if (!response.ok) {
        const errorResponse = await response.json();
        const error = new Error(errorResponse.error || response.statusText);
        error.name = `HTTP Error ${response.status}`;
        throw error;
    }

    return await response.json();
};

export const searchResources = async (query) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/health/search?query=${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
  });
    if (!response.ok) {
        const errorResponse = await response.json();
        const error = new Error(errorResponse.error || response.statusText);
        error.name = `HTTP Error ${response.status}`;
        throw error;
    }

    return await response.json();
};

export const categorizeResources = async (category) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/health/category?category=${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
  });
    if (!response.ok) {
        const errorResponse = await response.json();
        const error = new Error(errorResponse.error || response.statusText);
        error.name = `HTTP Error ${response.status}`;
        throw error;
    }

    return await response.json();
};