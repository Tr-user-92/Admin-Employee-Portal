import React from "react";
import { useEffect,useRef,useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";


function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("Admin");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Disabled
                </a>
              </li>
              <li className="nav-item  position-relative" ref={dropdownRef}>
                <FaRegUserCircle
                className="user-icon-login"
                size={28}
                style={{ cursor: "pointer" }}
                onClick={() => setShowDropdown((prev) => !prev)}
              />
               {showDropdown && (
                <div className="user-dropdown">
                  <p className="dropdown-item"><FaUserTie /> {username}</p>
                  <button className="dropdown-item logout-button" onClick={handleLogout}>
                    <IoLogOutOutline /> Logout
                  </button>
                </div>
              )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
