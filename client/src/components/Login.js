import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const response = await axios.post("http://localhost:5005/users/login", {
        username,
        password,
      });

      console.log("you are logged in!");
      localStorage.setItem("token", response.data.token);
      auth.setIsAuthenticated(true);

      navigate("/courts"); // Redirect to the CourtList page
    } catch (error) {
      console.error(error);
      setError(
        error.response.data.message || "An error occured while logging in."
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
