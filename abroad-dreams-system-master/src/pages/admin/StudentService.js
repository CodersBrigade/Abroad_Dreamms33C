// StudentService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/admin/students';

const StudentService = {
    getAllStudents: () => axios.get(`${API_BASE_URL}/getAll`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } }),

    getStudentById: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getById/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching student by User ID ${userId}:`, error);
            throw error;
        }
    },

    addStudent: (studentData) => axios.post(`${API_BASE_URL}/save`, studentData,
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } }),

    updateStudent: (id, studentData) => axios.put(`${API_BASE_URL}/update/${id}`, studentData,
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } }),

    deleteStudent: (id) => axios.delete(`${API_BASE_URL}/delete/${id}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } }),
};

export default StudentService;
