// PaymentService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/payments';

const PaymentService = {
    getAllPayments: () => axios.get(`${API_BASE_URL}/getAll`,
        {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}}),

    getPaymentById: (id) => axios.get(`${API_BASE_URL}/getById/${id}`,
        {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}}),

    addPayment: (paymentData) => axios.post(`${API_BASE_URL}/save`, paymentData,
        {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}}),

    updatePayment: (id, paymentData) => axios.put(`${API_BASE_URL}/update/${id}`, paymentData,
        {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}}),

    deletePayment: (id) => axios.delete(`${API_BASE_URL}/delete/${id}`,
        {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}}),

    getPaymentsByDate: (paymentDate) => axios.get(`${API_BASE_URL}/findByPaymentDate?paymentDate=${paymentDate}`,
        {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}}),

    getPaymentsByStatus: (status) => axios.get(`${API_BASE_URL}/findByStatus?status=${status}`,
        {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}}),
};

export default PaymentService;
