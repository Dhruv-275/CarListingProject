import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");

  const updateDateTime = () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    setCurrentDateTime(`${formattedDate} ${formattedTime}`);
  };

  useEffect(() => {
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkIn = async () => {
    try {
      const timeIn = new Date().toISOString();
      const response = await axios.post(
        `http://localhost:3000/attendance/markIn`,
        { timeIn },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message);
    }
  };

  const handleMarkOut = async () => {
    try {
      const timeOut = new Date().toISOString();
      const response = await axios.post(
        `http://localhost:3000/attendance/markOut`,
        { timeOut },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message);
    }
  };

  return (
    <div className="attendance-div">
      <h2>Daily Attendance</h2>
      <div className="date-time">
        <h3>{currentDateTime}</h3>
      </div>
      <div className="buttons">
        <button style={{ borderRadius: "5px" }} onClick={handleMarkIn}>
          Mark In
        </button>
        <button style={{ borderRadius: "5px" }} onClick={handleMarkOut}>
          Mark Out
        </button>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}
