import axios from "axios";

const API_URL = "http://192.168.18.179:3000/auth"; //home
// const API_URL = "http://172.16.92.66:3000/auth"; 
// const API_URL = "http://192.168.226.45:3000/auth"; //

export const signUpUser = async (userData) => {
	console.log(userData);
	try {
		const response = await axios.post(`${API_URL}/signup`, userData);
		console.log("Signed Up Successfully");

		// console.log(response);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const loginUser = async (userData) => {
	console.log("apiLogin:", userData);
	try {
		const response = await axios.post(`${API_URL}/login`, userData);
		// console.log("apiLoginResponse:", response);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const logoutUser = async (sessionToken) => {
	console.log("apiLogout:", sessionToken);
	try {
		const response = await axios.post(`${API_URL}/logout/${sessionToken}`);
		if (response.status == 200) return true;
		else return false;
	} catch (error) {
		console.log(error);
	}
};

export const isSessionValid = async (sessionId) => {
	console.log("isSessionValid Api:", sessionId);
	try {
		const response = await axios.get(`${API_URL}/verifysession/${sessionId}`);
		if (response.status == 200) {
			return true;
		} else {
			console.log("Session timed out");
			return false;
		}
	} catch (error) {
		console.log("Session timed out",error);
		return false;
	}
};

export const fetchUserDetails = async (sessionId) => {
	try {
		const response = await axios.get(`${API_URL}/getuser/${sessionId}`);
		if (response.status == 200) {
			console.log("fetchUserDetails: in status 200");
			return response;
		} else {
			console.log("in error");
		}
	} catch (error) {
		console.log(error);
	}
};
