import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Navbar from "../../components/home/navbar/Navbar.jsx";
import SessionNavbar from "../../components/home/navbar/SessionNavbar.jsx";
import NoticeCard from "./NoticeCard.jsx";
import NoticeService from "../admin/NoticeService.js";
import NoticeCalendar from "../../components/admin/NoticeCalendar.jsx";

const AllNotices = () => {
    // Fetch notices using useLoaderData
    const noticesFromLoader = useLoaderData() || [];
    const [notices, setNotices] = useState(noticesFromLoader);

    // Check if accessToken is available
    const isSessionActive = localStorage.getItem("accessToken");

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await NoticeService.getAllNotices();
            setNotices(response.data);
        } catch (error) {
            console.error('Error fetching notices:', error);
        }
    };

    return (
        <div>
            {isSessionActive ? <SessionNavbar /> : <Navbar />}
            <NoticeCalendar/>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {Array.isArray(notices) &&
                    notices.map((notice) => (
                        <div key={notice.noticeId} style={{ flex: "0 0 18rem", margin: "10px" }}>
                            <NoticeCard notice={notice} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AllNotices;
