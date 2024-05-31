import axios from 'axios';

const API_URL = 'http://localhost:3000/land';

export const getUserLands = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    console.log('In api   :    ', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOneLand = async (landId) => {
  if (true) {
    console.log('api get one landddd : ', landId.id);
    const response = await axios.get(`${API_URL}/land/${landId.id}`);
    console.log('trans in land api : ', response);
    return response;
  }
  // catch (error) {
  //   throw error;
  // }
};

export const addLand = async (land) => {
  try {
    const response = await axios.post(`${API_URL}/create`, land);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateLand = async (userId, LandId, land) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}/${vehicleId}`, vehicle);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const deleteVehicle = async (userId, vehicleId) => {
//     try {
//         const response = await axios.post(
//             `${API_URL}/${userId}/vehicles/${vehicleId}`
//         );
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };
