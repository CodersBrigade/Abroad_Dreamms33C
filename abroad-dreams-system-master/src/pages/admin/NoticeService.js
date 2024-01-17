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

    deleteNotice: (id) => axios.delete(`${API_BASE_URL}/delete/${id}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } }),
};

export default NoticeService;
