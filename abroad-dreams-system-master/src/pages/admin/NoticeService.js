// NoticeService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/notices';

const NoticeService = {
    getAllNotices: () => axios.get(`${API_BASE_URL}/getAll`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } }),

    addNotice: (noticeData) => axios.post(`${API_BASE_URL}/save`, noticeData,
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } }),

    updateNotice: (id, noticeData) => axios.put(`${API_BASE_URL}/update/${id}`, noticeData,
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } }),

    getNoticeById: async (noticeId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getById/${noticeId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching notice by Notice ID ${noticeId}:`, error);
            throw error;
        }
    },


    deleteNotice: (id) => axios.delete(`${API_BASE_URL}/delete/${id}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } }),
};

export default NoticeService;
