import axios from "axios";

const API_URL = "http://192.168.18.179:3000"; //home
// const API_URL = "http://172.16.92.66:3000"; //college
// const API_URL = "http://192.168.226.45:3000/auth"; //


export const getUserVehicles = async (userId) => {
	console.log("in get user vehicles api");
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
	console.log("Vehicles from api ",vehicle);
	try {
		const response = await axios.post(`${API_URL}/vehicle/add`, vehicle);
		console.log("in add api2");
		// console.log(response);
		return response;
	} catch (error) {
		throw error;
	}
};

export const updateVehicle = async (userId, vehicleId, vehicle) => {
	try {
		const response = await axios.post(
			`${API_URL}/${userId}/vehicles/${vehicleId}`,
			vehicle
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteVehicle = async (userId, vehicleId) => {
	try {
		const response = await axios.post(
			`${API_URL}/${userId}/vehicles/${vehicleId}`
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};
