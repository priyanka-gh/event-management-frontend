import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const handleAdminSignup = async (formData) => {
  const response = await fetch("http://localhost:8000/users/token", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

export const handleEventCreate = async (eventData) => {
  console.log(Cookies.get("access_token"));
  const response = await fetch("http://localhost:8000/event/create-event", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`, // Include the Bearer token
      "Content-Type": "application/json", // Set the content type as needed
    },
    body: JSON.stringify(eventData),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

export const deleteEvent = async (event_id) => {
  const response = await fetch(
    `http://localhost:8000/event/delete-event/${event_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }
  );
};

export const getAllEvents = async () => {
  const response = await fetch("http://localhost:8000/event/get-all-events", {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

export const getThisEventDetails = async (eventId) => {
  const response = await fetch(
    `http://localhost:8000/event/get-event/${eventId}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

export const logout = () => {
  Cookies.remove("access_token");
  console.log("removed");
};
