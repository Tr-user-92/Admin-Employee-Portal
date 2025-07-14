import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Admin_register() {
  const navigate=useNavigate();
  const [adminData, setAdminData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    passwd: "",
    cnfpasswd: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullname":
        if (!value.trim()) {
          error = "full name is required";
        } else if (value.length < 3 || value.length > 25) {
          error = "Name must be between 3 and 25 characters";
        }
        break;
      case "username":
        if (!value.trim()) {
          error = "username is required";
        } else if (value.length < 4) {
          error = "usename must be atleast 4 characters long";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "email is required";
        } else if (
          !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
        ) {
          error = "Enter a valid email";
        }
        break;
      case "phone":
        const phoneStr = String(value);
        if (!phoneStr.trim()) {
          error = "Phone number is required";
        } else if (!/^\d{10}$/.test(phoneStr.trim())) {
          error = "Phone number should be 10 digits";
        }
        break;
      case "passwd":
        if (!value.trim()) {
          error = "password is required";
        }
        break;
      case "cnfpasswd":
        if (!value.trim()) {
          error = "confirm password is required";
        } else if (value !== adminData.passwd) {
          error = "password and confirm password must be same";
        }
        break;
      case "gender":
        if (!value.trim()) {
          error = "select the gender";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value, adminData); // Pass formData to validateField for image check

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((previtem) => ({
      ...previtem,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const key in adminData) {
      const error = validateField(key, adminData[key], adminData);
      if (error) {
        newErrors[key] = error;
      }
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Prevent submission if there are errors
    }

    const newAdmin = {
      ...adminData,
    };
    await axios.post("http://localhost:4040/adminregister", newAdmin);
    navigate("/login");
    setAdminData({
      fullname: "",
      username: "",
      email: "",
      phone: "",
      passwd: "",
      cnfpasswd: "",
      gender: "",
    });
  };
  return (
    <>
      <div className="Register-container">
        <form
          action="/"
          className="form-box"
          method="post"
          onSubmit={handleSubmit}
        >
          <h2> Admin Registration</h2>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                id="fullname"
                name="fullname"
                value={adminData.fullname}
                onChange={handleChange}
                  onBlur={handleBlur}
              />
              {errors.fullname &&(
                <span className="error-message">{errors.fullname}</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                id="username"
                name="username"
                value={adminData.username}
                onChange={handleChange}
                 onBlur={handleBlur}
              />
              {errors.username &&(
                <span className="error-message">{errors.username}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                name="email"
                value={adminData.email}
                onChange={handleChange}
                 onBlur={handleBlur}
              />
              {errors.email &&(
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your number"
                id="phone"
                name="phone"
                value={adminData.phone}
                onChange={handleChange}
                 onBlur={handleBlur}
              />
              {errors.phone &&(
                <span className="error-message">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="passwd">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                id="passwd"
                name="passwd"
                value={adminData.passwd}
                onChange={handleChange}
                 onBlur={handleBlur}
              />
              {errors.passwd &&(
                <span className="error-message">{errors.passwd}</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="cnfpasswd">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                id="cnfpasswd"
                name="cnfpasswd"
                value={adminData.cnfpasswd}
                onChange={handleChange}
                 onBlur={handleBlur}
              />
              {errors.cnfpasswd &&(
                <span className="error-message">{errors.cnfpasswd}</span>
              )}
            </div>
          </div>

          <div className="gender-group">
            <label>Gender</label>
            <div className="gender-options">
              <label htmlFor="male">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  id="male"
                  checked={adminData.gender === "male"}
                  onChange={handleChange}
                   onBlur={handleBlur}
                />{" "}
                Male
              </label>
              <label htmlFor="female">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  id="female"
                  checked={adminData.gender === "female"}
                  onChange={handleChange}
                   onBlur={handleBlur}
                />{" "}
                Female
              </label>
              {errors.gender &&(
                <span className="error-message">{errors.gender}</span>
              )}
              {/* <label htmlFor=''><input type="radio" name="gender" value="none" /> Prefer not to say</label> */}
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
           <p className="login-text">Already Registered ? <Link to="/login" className="create-link">Login Now</Link></p>
        </form>
      </div>
    </>
  );
}

export default Admin_register;
