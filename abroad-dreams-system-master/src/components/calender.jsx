import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import '../components/calender.css'

function Calendar() {
  return (
    <div style={{ padding: "20px", marginLeft:190 }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
          
        }}
        
        height={"80vh"}
        aspectRatio={1.5}
        events={[
          { title: "Event 1", date: "2023-01-01" },
          { title: "Event 2", date: "2023-01-05" },
          { title: "Event 3", date: "2023-01-10" },
        ]}
        eventClick={(event) => alert(`Clicked on event: ${event.event.title}`)}
        dayMaxEventRows={true}
        editable={true} // Enable dragging and resizing
        eventContent={(eventInfo) => (
          <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
          </>
        )}
        selectable={true} // Allow date selection
        select={(selectionInfo) => alert(`Selected: ${selectionInfo.startStr} to ${selectionInfo.endStr}`)}
        selectMirror={true} 
        dayMaxEvents={true} 
      />
    </div>
  );
}

export default Calendar;
