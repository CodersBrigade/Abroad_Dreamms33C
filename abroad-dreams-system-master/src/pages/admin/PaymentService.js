import axios from 'axios';

const BASE_URL = 'http://localhost:8080/admin/payments';

const PaymentService = {
    getAllPayments: async () => {
        // try {
        //     const response = await axios.get(`${BASE_URL}/getAll`, {
        //         headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        //     });
        //     console.log(response.data);
        //     return response.data;
        // } catch (error) {
        //     console.error('Error fetching payments:', error);
        //     throw error;
        // }
    },

    getPaymentById: async (id) => {
        // try {
        //     const response = await axios.get(`${BASE_URL}/getById/${id}`, {
        //         headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        //     });
        //     return response.data;
        // } catch (error) {
        //     console.error(`Error fetching payment with ID ${id}:`, error);
        //     throw error;
        // }
    },

    addPayment: async (paymentData) => {
        // try {
        //     const response = await axios.post(`${BASE_URL}/save`, paymentData, {
        //         headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        //     });
        //     return response.data;
        // } catch (error) {
        //     console.error('Error adding payment:', error);
        //     throw error;
        // }
    },

    updatePayment: async (id, paymentData) => {
        // try {
        //     const response = await axios.put(`${BASE_URL}/update/${id}`, paymentData, {
        //         headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        //     });
        //     return response.data;
        // } catch (error) {
        //     console.error('Error updating payment:', error);
        //     throw error;
        // }
    },

    deletePayment: async (id) => {
        // try {
        //     const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
        //         headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        //     });
        //     return response.data;
        // } catch (error) {
        //     console.error(`Error deleting payment with ID ${id}:`, error);
        //     throw error;
        // }
    },

    getPaymentsByDate: async (paymentDate) => {
        // try {
        //     const response = await axios.get(`${BASE_URL}/findByPaymentDate?paymentDate=${paymentDate}`, {
        //         headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        //     });
        //     return response.data;
        // } catch (error) {
        //     console.error(`Error fetching payments by date ${paymentDate}:`, error);
        //     throw error;
        // }
    },

    fetchPayments: async () => {
        // try {
        //     const response = await axios.get(`${API_BASE_URL}/getAll`,
        //         { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } });
        //     // Filter payments with status "Paid"
        //     const paidPayments = response.data.filter(payment => payment.status === 'Paid');
        //     console.log('Fetched paid payments:', paidPayments);
        //     // Calculate the total amount
        //     const totalAmount = paidPayments.reduce((sum, payment) => sum + payment.amount, 0);
        //     console.log('Total payment amount:', totalAmount);
        //     // You may want to set the payment data in the state if needed
        // } catch (error) {
        //     console.error('Error fetching payments:', error);
        //     // Handle the error, show a message, etc.
        // }
    },

    getPaymentsByStatus: async (status) => {
        // try {
        //     const response = await axios.get(`${BASE_URL}/findByStatus?status=${status}`, {
        //         headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        //     });
        //     return response.data;
        // } catch (error) {
        //     console.error(`Error fetching payments by status ${status}:`, error);
        //     throw error;
        // }
    },
};

export default PaymentService;
