import axios from "axios";

const API_URL = "http://localhost:8080"; 

export const fetchLogs = async (userId) => {
    try {
        const token = localStorage.getItem('token'); 

        const response = await axios.get(`${API_URL}/logs/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching logs:", error);
        throw error;
    }
};

export const submitLog = async (logData) => {
    try {
        const token = localStorage.getItem('token');  

        const response = await axios.post(`${API_URL}/log`, logData, {
            headers: {
                Authorization: `Bearer ${token}`, 
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error submitting log:", error);
        throw error;
    }
};
