export const createEvent = async (user_id: number, title: string, description: string, location: string, startTime: string, endTime: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/calendar/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id, title, description, location, startTime, endTime}),

    });
    if (!response.ok) {
        const errorResponse = await response.json();
        const error = new Error(errorResponse.error || response.statusText);
        error.name = `HTTP Error ${response.status}`;
        throw error;
    }

    return await response.json();
};


export const deleteEvent = async (eventId: number, userId: number) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/calendar/${eventId}/${userId}`, {
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
}


export const modifyEvent = async (eventId: number, userId: number, title: string, description: string, location: string, startTime: string, endTime: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/calendar/${eventId}/${userId}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description, location, startTime, endTime}),

    });

    if (!response.ok) {
        const errorResponse = await response.json();
        const error = new Error(errorResponse.error || response.statusText);
        error.name = `HTTP Error ${response.status}`;
        throw error;
    }

    return await response.json();
}

export const getEvent = async (eventId: number) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/calendar/${eventId}`, {
        method: 'GET',
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
}

export const getEventsOnDate = async (selectedDate: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/calendar/onDate/${selectedDate}`, {
        method: 'GET',
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

export const getAllEvents = async () => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/calendar/getAllEvents`, {
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

export const getEventsForMonth = async (year: number, month: number) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/calendar/forMonth/${year}/${month}`, {
        method: 'GET',
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

