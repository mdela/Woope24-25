// { title: "CSUN Library", coordinate: { latitude: 34.239958, longitude: -118.529187 } }

async function verifyAuthStatus() {
    return true;
}

export const addPin = async (title: string, longitude: string, latitude: string) => {
    // verify logged in first then,
    if (!verifyAuthStatus()) return false;
	const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/add-pin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ title, longitude, latitude }),
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		const error = new Error(errorResponse.error || response.statusText);
		error.name = `HTTP Error ${response.status}`;
		throw error;
	}

	return await response.json();
}

export const getPins = async () => {
    // verify logged in first then,
    if (!verifyAuthStatus()) return false;
	const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/get-pins`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: null,
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		const error = new Error(errorResponse.error || response.statusText);
		error.name = `HTTP Error ${response.status}`;
		throw error;
	}

	return await response.json();
}