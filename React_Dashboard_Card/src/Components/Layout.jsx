import React from "react";
import Navbar from "./Navbar";
import Sidenavbar from "./Sidenavbar";
import "../App.css"; 

const Layout = ({ children }) => {
  return (
    <div className="page-layout">
      <Navbar />
      <div className="app-container">
        <Sidenavbar />
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
