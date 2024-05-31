import axios from "axios";

const API_URL = "http://192.168.18.179:3000/challan"; //home

export const addChallan = async (challan) => {
	console.log("Challan from api ", challan);
	try {
		const response = await axios.post(`${API_URL}/add`, challan);
		return response;
	} catch (error) {
		throw error;
	}
};

export const getAllChallans = async () => {
	try {
		const response = await axios.get(`${API_URL}/view`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getChallansById = async (challanId) => {
	try {
		const response = await axios.get(`${API_URL}/view/${challanId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateChallan = async (challan) => {
	const { id, issueDate, reason, vehicleId } = challan;
	try {
		const response = await axios.put(`${API_URL}/${id}`, {
			issueDate,
			fine: "0",
			reason,
			vehicleId,
		});
		return response.data;
	} catch (error) {
		console.error(`Error updating challan: ${error.message}`);
	}
};

export const deleteChallan = async (challanId) => {
	try {
		const response = await axios.delete(`${API_URL}/${challanId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
