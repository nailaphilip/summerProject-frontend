import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

import "./EventPage.css";

function EventPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/events/${params.id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="event-page">
      <div className="event-card">
        <img className="event-photo" src={data.picture} alt={data.title} />
        <div className="recipe-card-content">
          <h2>{data.title}</h2>
          <p>{data.info}</p>
          <p>{data.date}</p>
          <p>{data.time}</p>
          <p>{data.duration}</p>
          <p>{data.location}</p>
          <p>{data.transport}</p>
        </div>
        <button className="go-back-button" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
      <p>Sign up to recieve updates about this event</p>
      <SignUpForm />
    </div>
  );
}

export default EventPage;
