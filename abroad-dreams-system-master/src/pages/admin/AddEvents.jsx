import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
// import AdminSidebar from "../Components/Sidebar.jsx";
// import AdminHeader from "../Components/Header.jsx";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([
    // {
    //     id: 1,
    //     title: 'Event 1',
    //     start: new Date(2024, 0, 20, 10, 0),
    //     end: new Date(2024, 0, 20, 12, 0),
    // },
    // {
    //     id: 2,
    //     title: 'Event 2',
    //     start: new Date(2024, 0, 21, 13, 0),
    //     end: new Date(2024, 0, 21, 15, 0),
    // },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleAddEvent = () => {
    const id = events.length + 1;
    const formattedEvent = {
      id,
      ...newEvent,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
    };
    setEvents([...events, formattedEvent]);
    setNewEvent({ title: "", start: new Date(), end: new Date() });
  };

  return (
    <div>
      {/* <AdminHeader /> */}

      <div>
        {/* <AdminSidebar /> */}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ height: "500px", marginLeft: 270, marginBottom: 400 }}>
          <div>
            <center
              style={{ color: "darkred", marginTop: 100, marginBottom: 20 }}
            >
              {" "}
              <h1 style={{ color: "orange" }}>Event Calendar</h1>
            </center>
            <label
              style={{ marginLeft: 30, marginRight: 10, fontWeight: "bold" }}
            >
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
            />
            <label
              style={{ marginLeft: 30, fontWeight: "bold", marginRight: 30 }}
            >
              Start Date and Time:
            </label>
            <input
              style={{ fontWeight: "bold" }}
              type="datetime-local"
              name="start"
              value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
              onChange={handleInputChange}
            />
            <label style={{ marginRight: 70, fontWeight: "bold" }}>
              End Date and Time:
            </label>
            <input
              style={{ fontWeight: "bold" }}
              type="datetime-local"
              name="end"
              value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
              onChange={handleInputChange}
            />
            <button
              style={{ fontWeight: "bold", marginLeft: 30 }}
              onClick={handleAddEvent}
            >
              Add Event
            </button>
          </div>

          {/* Render the Calendar */}
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ margin: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
