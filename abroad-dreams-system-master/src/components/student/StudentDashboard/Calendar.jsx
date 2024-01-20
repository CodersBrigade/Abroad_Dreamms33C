import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

const MyCalendar = ({
  title = "Calendar",
  initialDate = new Date(),
  additionalStyles,
}) => {
  const [date, setDate] = useState(initialDate);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className={`card mt-4 min-w-600 calendar ${additionalStyles}`}>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="rounded p-3 border"
        />
      </div>
    </div>
  );
};

export default MyCalendar;
