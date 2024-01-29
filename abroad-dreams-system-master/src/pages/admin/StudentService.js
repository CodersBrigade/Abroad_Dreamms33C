// StudentService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/admin/students';

const StudentService = {
    getAllStudents: () => axios.get(`${API_BASE_URL}/getAll`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } }),

    addStudent: (studentData) => axios.post(`${API_BASE_URL}/save`, studentData,
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } }),

    updateStudent: (id, studentData) => axios.put(`${API_BASE_URL}/update/${id}`, studentData,
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } }),

    deleteStudent: (id) => axios.delete(`${API_BASE_URL}/delete/${id}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } }),
};

export default StudentService;
