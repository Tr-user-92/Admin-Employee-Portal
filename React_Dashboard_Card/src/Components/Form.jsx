import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const editData = state?.employee;
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    fullName: "",
    jobDesc: "",
    image: "",
    email: "",
    phone: "",
    bloodGrp: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        fullName: editData.fullName,
        jobDesc: editData.jobDesc,
        image: editData.image, // Keep the image string for initial display if it's an existing image
        email: editData.email,
        phone: editData.phone,
        bloodGrp: editData.bloodGrp,
      });
    }
  }, [editData]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Full name is required";
        } else if (value.length < 4) {
          error = "Name must be at least 4 characters long";
        }
        break;
      case "jobDesc":
        if (!value.trim()) {
          error = "Job description is required";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
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
      case "bloodGrp":
        if (!value.trim()) {
          error = "Blood group is required";
        }
        break;
      case "image":
        // For image, we need to consider if it's an existing string (for edit) or a new file
        if (!value || (typeof value === "string" && value === "")) {
          error = "Image is required";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error immediately when user starts typing/changing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));

    // Clear image error when a file is selected
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value, formData); // Pass formData to validateField for image check

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const newErrors = {};
    for (const key in formData) {
      const error = validateField(key, formData[key], formData);
      if (error) {
        newErrors[key] = error;
      }
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Prevent submission if there are errors
    }

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("jobDesc", formData.jobDesc);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("bloodGrp", formData.bloodGrp);
    formDataToSend.append("image", formData.image);

    try {
      if (editData?._id) {
        await axios.put(
          `http://localhost:4040/data/${editData._id}`,
          formDataToSend
        );
        alert("Employee updated successfully!"); // Use alert for user feedback
        navigate("/cards");
      } else {
        await axios.post("http://localhost:4040/data", formDataToSend);
        // alert("Employee added successfully!");
        // navigate("/cards");
      }
    } catch (err) {
      console.error("Error saving employee:", err);
      alert("An error occurred while saving employee data.");
    }

    if (!editData?._id) {
      setFormData({
        fullName: "",
        jobDesc: "",
        image: "",
        email: "",
        phone: "",
        bloodGrp: "",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  return (
    <>
      <h3>Employee Information</h3>
      <div className="a">
        <div className="b">
          <form action="" method="post" onSubmit={handleSubmit}>
            <label htmlFor="fullname">Full Name:</label>
            <br />
            <input
              type="text"
              id="fullname"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
            <br />

            <label htmlFor="jobedescription">Job Position:</label>
            <br />
            <input
              type="text"
              id="jobedescription"
              name="jobDesc"
              placeholder="Enter job description"
              value={formData.jobDesc}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            {errors.jobDesc && (
              <span className="error-message">{errors.jobDesc}</span>
            )}
            <br />

            <label htmlFor="img"> Image: </label>
            <input
              type="file"
              id="img"
              name="image"
              placeholder="upload the image"
              ref={fileInputRef}
              onChange={handleFileChange}
              onBlur={handleBlur} // Add onBlur for file input
            />
            <br />
            {errors.image && (
              <span className="error-message">{errors.image}</span>
            )}
            <br />

            <label htmlFor="bloodgrp">Blood:</label>
            <br />
            <select
              id="bloodgrp"
              name="bloodGrp"
              value={formData.bloodGrp}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <br />
            {errors.bloodGrp && (
              <span className="error-message">{errors.bloodGrp}</span>
            )}
            <br />

            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
            <br />

            <label htmlFor="phone">Phone No:</label>
            <br />
            <input
              type="tel" // Changed to type="text" to allow leading zeros if necessary, and validate for digits only
              id="phone"
              name="phone"
              placeholder="Enter Phone no"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
            <br />

            <button type="submit">{editData ? "Update" : "Submit"}</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
