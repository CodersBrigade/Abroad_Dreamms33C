import axios from 'axios';

const BASE_URL = 'http://localhost:8080/system-user'; // Replace with your API endpoint

const SystemUserService = {
    getAllUsers: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getAll`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    getUserById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/getById/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error);
            throw error;
        }
    },

    addUser: async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/save`, userData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    },

    updateUser: async (userId, updatedUserData) => {
        try {
            const response = await axios.put(`${BASE_URL}/update/${userId}`, updatedUserData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    removeUser: async (userId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error(`Error removing user with ID ${userId}:`, error);
            throw error;
        }
    },
};

export default SystemUserService;
