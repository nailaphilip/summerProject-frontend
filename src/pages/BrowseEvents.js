import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";

import "./BrowseEvents.css";

function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3001/events")
      .then((response) => response.json())
      .then((data) => setEvents(data));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="container">
          <h1>Browse Events</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search events"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="event-list">
            {events
              .filter((event) =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseEvents;
