import axios from 'axios';

const BASE_URL = 'http://localhost:8080/appointments';

const AppointmentService = {
    getAllAppointments: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getAll`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching appointments:', error);
            throw error;
        }
    },

    getAppointmentById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/getById/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching appointment with ID ${id}:`, error);
            throw error;
        }
    },

    addAppointment: async (appointmentData) => {
        try {
            const response = await axios.post(`${BASE_URL}/save`, appointmentData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding appointment:', error);
            throw error;
        }
    },

    addStudentAppointment: async (appointmentData) => {
        try {
            const response = await axios.post(`http://localhost:8080/student/appointments/save`, appointmentData
            );
            return response.data;
        } catch (error) {
            console.error('Error adding appointment:', error);
            throw error;
        }
    },

    updateAppointment: async (appointmentId, updatedAppointmentData) => {
        try {
            const response = await axios.put(`${BASE_URL}/update/${appointmentId}`, updatedAppointmentData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating appointment:', error);
            throw error;
        }
    },

    removeAppointment: async (appointmentId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete/${appointmentId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error(`Error removing appointment with ID ${appointmentId}:`, error);
            throw error;
        }
    },

    getByDate: async (date) => {
        try {
            const response = await axios.get(`${BASE_URL}/getByDate?date=${date}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching appointments for ${date}:`, error);
            throw error;
        }
    },
};

export default AppointmentService;
