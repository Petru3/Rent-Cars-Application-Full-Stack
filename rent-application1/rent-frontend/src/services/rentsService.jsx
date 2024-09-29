import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Helper function to get the token from localStorage
const getToken = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('No token found');
    // Optional: redirect to login page or show a message to the user
    return null;
  }
  
  return token;
};

// Fetch all rents
export const getAllRents = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token provided');

    return await axios.get(`${API_URL}/rents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error fetching rents:', error.response || error);
    throw error;
  }
};

// Fetch all rents for the logged-in owner
export const getAllRentsForOwners = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token provided');

    return await axios.get(`${API_URL}/rents/owners`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error fetching rents for owners:', error.response || error);
    throw error;
  }
};

// Fetch all rents for the dashboard
export const getAllRentsForDashboard = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token provided');

    const response = await axios.get(`${API_URL}/rents/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching rents for dashboard:', error.response || error);
    throw error;
  }
};

// Fetch a single rent by its ID
export const getOneRentById = async (id) => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token provided');

    return await axios.get(`${API_URL}/rents/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error fetching rent by ID:', error.response || error);
    throw error;
  }
};


// Fetch all reviews for a specific rent by rentId
export const getReviewsByRentId = async (rentId) => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token provided');

    return await axios.get(`${API_URL}/reviews/rent/${rentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error.response || error);
    throw error;
  }
};

// Add a new review for a rent
export const addReviewForRent = async (rentId, reviewData) => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token provided');

    return await axios.post(
      `${API_URL}/reviews/rent/${rentId}`,
      reviewData, // The review content
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error('Error adding review:', error.response || error);
    throw error;
  }
};


export const deleteReview = async (reviewId) => {
  // Validate reviewId
  if (!reviewId) {
    throw new Error('Review ID is required to delete a review.');
  }

  try {
    const token = getToken(); // Assuming this function retrieves the token from local storage or a similar source
    if (!token) {
      throw new Error('No token provided'); // Clearer error message
    }

    const response = await axios.delete(`${API_URL}/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data; // Return the response data for further processing if needed
  } catch (error) {
    console.error('Error deleting review:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error after logging it
  }
};
// Update a rent by its ID
export const updateRentById = async (id, rentData) => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token provided');

    // Update the URL to match your NestJS route for updating rent by ID
    return await axios.patch(`${API_URL}/rents/update/${id}`, rentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error updating rent:', error.response || error);
    throw error;
  }
};
// Delete a rent by its ID
export const deleteRentById = async (id) => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token provided');

    return await axios.delete(`${API_URL}/rents/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting rent:', error.response || error);
    throw error;
  }
};
export const createRent = async (rentData) => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token provided');

    const response = await axios.post(`${API_URL}/rents`, rentData, {
      headers: {
        Authorization: `Bearer ${token}`, // Passing the JWT token for authorization
      },
    });

    return response.data; // Assuming the API returns the created rent data
  } catch (error) {
    console.error('Error creating rent:', error.response || error);
    throw error; // Rethrowing the error to handle it in the UI
  }
};