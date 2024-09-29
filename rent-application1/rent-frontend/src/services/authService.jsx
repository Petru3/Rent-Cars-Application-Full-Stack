import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; // Change this URL based on your backend setup

// Sign Up request
const signUp = (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

// Sign In request
const signIn = (userData) => {
  return axios.post(`${API_URL}/signin`, userData);
};

const authService = {
  signUp,
  signIn,
};

export default authService;
