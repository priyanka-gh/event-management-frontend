import React, { useState, useEffect } from "react";
import { handleAdminSignup } from "../apicalls/AdminCalls";
import { useHistory } from 'react-router-dom';
import Cookies from "js-cookie";
import "./AdminForm.css"; // Import your CSS file

const AdminForm = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitInput = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await handleAdminSignup(formData);

    if (response.hasOwnProperty('access_token')) {
      Cookies.set("access_token", response.access_token);
      console.log(response);
      window.location.href = '/admin-dashboard';

      const expirationTime = new Date(Date.now() + 120 * 60 * 1000);
      Cookies.set("access_token", response.access_token, { expires: expirationTime });
    } else {
      setError(response.detail || "An error occurred.");
      console.log("Err ", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      Cookies.remove("access_token");
      window.location.href = '/admin';
    }, 120 * 60 * 1000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="admin-form-container">
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />
      <button className="submit-button" onClick={submitInput}>SUBMIT</button>
    </div>
  );
};

export default AdminForm;
