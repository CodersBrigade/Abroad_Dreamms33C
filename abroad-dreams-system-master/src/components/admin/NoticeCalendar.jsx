import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isSameDay } from 'date-fns';
import NoticeService from '../../pages/admin/NoticeService.js';

export default function NoticeCalendar() {
    const [notices, setNotices] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

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

    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    const getNoticesForSelectedDate = () => {
        return notices.filter((notice) => isSameDay(new Date(notice.date), selectedDate));
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <Calendar onChange={onDateChange} value={selectedDate} />
            </div>
            <div className="col-md-8">
                <h3>Notices for {selectedDate.toDateString()}</h3>
                <ul>
                    {getNoticesForSelectedDate().map((notice) => (
                        <li key={notice.noticeId}>
                            <strong>{notice.title}</strong> - {notice.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
