// PaymentService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/student/payments';

const PaymentService = {
    getPaymentById: (id) => axios.get(`${API_BASE_URL}/getPaymentById/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }),


    getByUserId: (userId) => axios.get(`${API_BASE_URL}/getById/${userId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }),

    updatePayment: (id, paymentData) => axios.put(`${API_BASE_URL}/update/${id}`, paymentData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }),

    getPaymentsByStatus: (status) => axios.get(`${API_BASE_URL}/status/${status}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }),

    getPaymentsByDate: (date) => axios.get(`${API_BASE_URL}/date/${date}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }),


};

export default PaymentService;
