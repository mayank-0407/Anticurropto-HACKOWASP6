import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getUserVehicles = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/vehicle/view/all/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getOneVehicles = async (vehicleId) => {
  try {
    const response = await axios.get(`${API_URL}/vehicle/view/${vehicleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addVehicle = async (vehicle) => {
  try {
    const response = await axios.post(`${API_URL}/vehicle/add`, vehicle);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateVehicle = async (userId, vehicleId, vehicle) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}/vehicles/${vehicleId}`, vehicle);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteVehicle = async (userId, vehicleId) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}/vehicles/${vehicleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
