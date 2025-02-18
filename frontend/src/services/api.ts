import axios from "axios";

const API_URL = "http://localhost:5050/api";

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/record`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data", error);
        return [];
    }
};
