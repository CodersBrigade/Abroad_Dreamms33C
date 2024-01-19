import axios from 'axios';

const BASE_URL = 'http://localhost:8080/admin/course'; // Replace with your API endpoint

const CourseService = {
    getAllCourses: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getAll`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    },

    getCourseById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/getById/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching course with ID ${id}:`, error);
            throw error;
        }
    },

    addCourse: async (courseData) => {
        try {
            const response = await axios.post(`${BASE_URL}/save`, courseData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding course:', error);
            throw error;
        }
    },

    updateCourse: async (courseId, updatedCourseData) => {
        try {
            const response = await axios.put(`${BASE_URL}/update/${courseId}`, updatedCourseData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating course:', error);
            throw error;
        }
    },

    removeCourse: async (courseId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete/${courseId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error(`Error removing course with ID ${courseId}:`, error);
            throw error;
        }
    },
};

export default CourseService;
