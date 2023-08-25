import React, { useState, useEffect } from 'react';
import { getAllEvents } from '../apicalls/UserCalls';
import './Events.css'
const Events = () => {
  const [events, setEvents] = useState([]);

  const participateInThisEvent = (eventId) => {
    window.location.href = `participate/${eventId}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEvents();
      setEvents(data);
    };
    fetchData();
  }, []);

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>
      <div className="event-list">
        {events.map((ev) => (
          <div key={ev.event_id} className="event-card">
            <h3 className="event-name">{ev.eventName}</h3>
            <p className="event-desc">{ev.eventDesc}</p>
            <p className="event-date">Date: {ev.eventDate}</p>
            <p className="event-age">Minimun Participation Age: {ev.eventMinAge}</p>
            <button className="event-button" onClick={() => participateInThisEvent(ev.event_id)}>Participate</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
