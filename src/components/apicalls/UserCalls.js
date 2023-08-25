import React, { useState, useEffect } from "react";

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

export const postUserData = async (eventId, data) => {
  const response = await fetch(
    `http://localhost:8000/event/join-event/${eventId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type as needed
      },
      body: JSON.stringify(data),
    }
  );
  if (response.ok) {
    const data = await response.json();
    console.log("suc", data);
    return data.message;
  } else {
    const errorData = await response.json();
    console.log("Err", errorData);
    return errorData.detail[0].msg;
  }
};

export const checkInUser = async (eventId, participantId) => {
  const response = await fetch(
    `http://localhost:8000/event/check-in/${eventId}/${participantId}`,
    {
      method: "POST",
    }
  );
  if (response.ok) {
    const data = await response.json();
    console.log("suc", data);
    return data;
  } else {
    const errorData = await response.json();
    console.log("Err", errorData);
    return errorData.detail[0].msg;
  }
};
