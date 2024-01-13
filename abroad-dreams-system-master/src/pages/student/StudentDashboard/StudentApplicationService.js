import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/student/application';

const StudentApplicationService = {
    saveApplication: (applicationData) => axios.post(`${API_BASE_URL}/save`, applicationData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }),

    getApplicationById: (applicationId) => axios.get(`${API_BASE_URL}/${applicationId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }),

    getByUserId: (userId) => axios.get(`${API_BASE_URL}/getByUser/${userId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }),

    getAllApplications: () => axios.get(`${API_BASE_URL}/all`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }),

    updateApplication: (applicationId, applicationData) => axios.put(`${API_BASE_URL}/update/${applicationId}`, applicationData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }),

    deleteApplication: (applicationId) => axios.delete(`${API_BASE_URL}/delete/${applicationId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }),
};

export default StudentApplicationService;
