import React, { useState, useEffect } from 'react';
import { logout, handleEventCreate, deleteEvent, getAllEvents, getThisEventDetails } from '../apicalls/AdminCalls';
import Cookies from 'js-cookie';
import './admindashboard.css';

const AdminDashboard = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDesc: '',
    eventDate: '',
    eventMinAge: ''
  });
  const [events, setEvents] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await handleEventCreate(eventData);
    window.location.reload();
  };

  const handleDelete = async (eventId) => {
    const resp = await deleteEvent(eventId);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEvents();
      setEvents(data);
    };
    fetchData();
  }, []);

  const getThisEvent = async (eventId) => {
    const response = await getThisEventDetails(eventId);
    // Do something with the response, if needed
  };

  const logoutAdmin = () => {
    logout();
    window.location.href = '/admin';
  };

  return (
    <div>
    <div className="admin-dashboard">
      <button className="logout-button" onClick={logoutAdmin}>LOGOUT</button>
      <form className="event-form" onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            name="eventName"
            value={eventData.eventName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Event Description:
          <input
            type="text"
            name="eventDesc"
            value={eventData.eventDesc}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Event Date:
          <input
            type="datetime-local"
            name="eventDate"
            value={eventData.eventDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Event Minimum Participation Age:
          <input
            type="number"
            name="eventMinAge"
            value={eventData.eventMinAge}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className="create-button" type="submit">Create Event</button>
      </form>
    </div>
      <div className="event-list">
        {events.map((ev) => (
          <div key={ev.event_id} className="event-item">
            <h6 onClick={() => getThisEvent(ev.event_id)}>{ev.eventName}</h6>
            <h6>{ev.eventDate}</h6>
            <a className="spreadsheet-link" href={ev.url} target="_blank" rel="noopener noreferrer">Spreadsheet</a>
            <button className="delete-button" onClick={() => handleDelete(ev.event_id)}>Delete</button>
          </div>
        ))}
      </div>
      </div>
  );
}

export default AdminDashboard;
