const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchTrips = async () => {
  try {
    const response = await fetch(`${baseUrl}trips`);
    if (!response.ok) {
      throw new Error('Failed to fetch trips');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};

export const fetchTrip = async (id) => {
  try {
    const response = await fetch(`${baseUrl}trips/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch trip with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching trip with id ${id}:`, error);
    throw error;
  }
};

export const createTrip = async (tripData) => {
  try {
    const response = await fetch(`${baseUrl}trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripData),
    });
    if (!response.ok) {
      throw new Error('Failed to create trip');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
};

export const deleteMeeting = async (tripId, meetingId) => {
  try {
    const response = await fetch(
      `${baseUrl}trips/${tripId}/meetings/${meetingId}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      throw new Error(`Failed to delete meeting with id ${meetingId}`);
    }
    console.log(`Meeting with id ${meetingId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting meeting with id ${meetingId}:`, error);
    throw error;
  }
};

export const addMeeting = async (tripId, meetingData) => {
  try {
    const response = await fetch(`${baseUrl}trips/${tripId}/meetings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meetingData),
    });
    if (!response.ok) {
      throw new Error('Failed to add meeting');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding meeting:', error);
    throw error;
  }
};
