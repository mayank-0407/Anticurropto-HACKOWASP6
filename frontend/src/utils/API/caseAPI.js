import axios from 'axios';

const BASE_URL = 'http://localhost:3000/case';

const createLandCase = async (landCaseData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, landCaseData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || 'Something went wrong');
  }
};

const getAllLandCases = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || 'Something went wrong');
  }
};

const getLandCaseById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || 'Something went wrong');
  }
};

const getLandCasesByUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || 'Something went wrong');
  }
};

export { createLandCase, getAllLandCases, getLandCaseById, getLandCasesByUser };
