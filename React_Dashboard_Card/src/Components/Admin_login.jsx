import axios from "axios";
import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Admin_login() {
  const [username, setUserName] = useState("");
  const [passwd, setPasswd] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const loginUser = { username, passwd };
    axios
      .post("http://localhost:4040/adminlogin", loginUser)
      .then((result) => {
        console.log("Login response:", result.data);
        if (result.data.status === "success") {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("username", username); // 👈 Save this
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log("error");
        alert("An error occurred during login",err);
        // navigate("/register");
      });
  };
  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <h2>Login</h2>

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            name="username"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="passwd"
            onChange={(e) => setPasswd(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="register-text">
            Don't have account?{" "}
            <Link to="/register" className="create-link">
              Create Now
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Admin_login;
