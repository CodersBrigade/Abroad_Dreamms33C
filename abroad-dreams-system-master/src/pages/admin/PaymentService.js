// PaymentService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/admin/payments';

const PaymentService = {
    savePayment: async (paymentData) => {
        try {
            const response = await axios.post(`${BASE_URL}/save`, paymentData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error saving payment:', error);
            throw error;
        }
    },

    getAllPayments: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getAll`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            console.log('Payments Fetched::::',response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching payments:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/getByPaymentId/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching payment with ID ${id}:`, error);
            throw error;
        }
    },

    updatePayment: async (id, paymentData) => {
        try {
            const response = await axios.put(`${BASE_URL}/update/${id}`, paymentData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating payment:', error);
            throw error;
        }
    },

    deletePaymentById: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error(`Error removing payment with ID ${id}:`, error);
            throw error;
        }
    },
};

export default PaymentService;
