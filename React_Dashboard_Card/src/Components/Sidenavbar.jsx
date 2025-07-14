import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { SiGoogleforms } from "react-icons/si";
import { IoIdCard } from "react-icons/io5";
import { TbLayoutDashboardFilled } from "react-icons/tb";

function Sidenavbar() {
 
  return (
    <>
      <nav className="sidenav">
        <ul>
           <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
           <TbLayoutDashboardFilled />
             Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/form"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <SiGoogleforms />
              Form
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cards"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <IoIdCard /> 
              Cards
            </NavLink>
          </li>
          <li>
            <NavLink to="#">Holiday</NavLink>
          </li>
          <li>
            <NavLink to="#">Attendence</NavLink>
          </li>
          <li>
            <NavLink to="#">Courses</NavLink>
          </li>
          <li>
            <NavLink to="#">My Teams</NavLink>
          </li>
          <li>
            <NavLink to="#">Jobs</NavLink>
          </li>
          <li>
            <NavLink to="#">Have Query?</NavLink>
          </li>
          <li>
            <NavLink to="#">Notification</NavLink>
          </li>

        </ul>
      </nav>
    </>
  );
}

export default Sidenavbar;
