import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Helper function to get the token from localStorage
const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return null;
  }
  return token;
};

// Create a booking
export const createBooking = async (rentId) => {
  const token = getToken();
  if (!token) throw new Error('No token provided');

  try {
    const response = await axios.post(`${API_URL}/bookings/create/${rentId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return response data
  } catch (error) {
    console.error('Error creating booking:', error.response?.data || error.message);
    throw error;
  }
};

export const finishBooking = async (bookingId, { dateRent }) => {
  const token = getToken();
  if (!token) throw new Error('No token provided');

  try {
    console.log('Sending dateRent:', dateRent); // Log the dateRent

    const response = await axios.post(`${API_URL}/bookings/finish-booking/${bookingId}`, {
      dateRent,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error finishing booking:', error.response?.data || error.message);
    throw error;
  }
};

// Cancel a booking
export const cancelBooking = async (bookingId) => {
  const token = getToken();
  if (!token) throw new Error('No token provided');

  try {
    const response = await axios.post(`${API_URL}/bookings/cancel-booking/${bookingId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return response data
  } catch (error) {
    console.error('Error canceling booking:', error.response?.data || error.message);
    throw error;
  }
};

export const getAllBookings = async () => {
  const token = getToken();
  if (!token) throw new Error('No token provided');

  try {
    const response = await axios.get(`${API_URL}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Verificare status și tip de date
    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data; // Returnează datele dacă sunt valide
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error fetching bookings:', error.response?.data || error.message);
    throw error; // Aruncă eroarea pentru a fi gestionată în altă parte
  }
};