import React, { useEffect, useState } from "react";
import "./Card.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { FaUserSlash } from "react-icons/fa6";

function Cards() {
  const [employees, setEmployees] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter((emp) =>
    emp.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("http://localhost:4040/data")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log("error fetching the data", err));
  }, []);

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the employee?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:4040/data/${id}`);
      const res = await axios.get("http://localhost:4040/data");
      setEmployees(res.data);
    } catch (err) {
      console.error("error in deleteing data", err);
    }
  };

  const navigate = useNavigate();

  const editEmployee = (emp) => {
    navigate("/form", { state: { employee: emp } });
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search.."
          name="search"
          className="searchbar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IoSearchSharp className="searchicon" />
      </div>

      <div className="card-container">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp, index) => (
            <div className="id-card" key={index}>
              <div className="header">
                <div className="company-logo">
                  <img
                    src="https://tms.skillptp.com/assets/dist/img/imsfavcion.png"
                    alt="logo"
                  />
                </div>

                <div className="company-name">ExcelPTP</div>
                <div className="tagline">PROFESSIONAL IT TRAINING PROGRAM</div>
              </div>

              <div className="profile-pic">
                {emp.image && (
                  <img
                    src={`http://localhost:4040${emp.image}`}
                    alt="Profile"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>

              <div className="info">
                <h2> {emp.fullName.toUpperCase()}</h2>
                <p className="job">{emp.jobDesc}</p>

                <div className="details">
                  <p>
                    <strong>ID No :</strong> {emp._id}
                  </p>
                  <p>
                    <strong>Blood :</strong> {emp.bloodGrp}
                  </p>
                  <p>
                    <strong>Email :</strong> {emp.email}
                  </p>
                  <p>
                    <strong>Phone :</strong> {emp.phone}
                  </p>
                </div>
              </div>

              {/* <div className="barcode"></div> */}
              <div className="edit-delete">
                <button
                  className="delete"
                  onClick={() => deleteEmployee(emp._id)}
                >
                  Delete
                </button>
                <button className="Edit" onClick={() => editEmployee(emp)}>
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="user-not-found">
            <FaUserSlash className="exclamation" />
            {/* <img src="https://tse4.mm.bing.net/th?id=OIP.sQr7Q3zUXoLw0ij8XRJORAHaHa&pid=Api&P=0&h=180" alt="user not found"/> */}
            <div className="no-results">USER NOT FOUND</div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cards;
