import React from "react";
import { FaUser } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { IoMdCloudDownload } from "react-icons/io";
import { FaComments } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa6";

function Dashboard() {
  return (
    <>
      {/* <h2>Welcome To Dashboard</h2> */}
      <div className="first-row-container">
        <div className="first-div">
          <p>
            <FaUser className="dashboard-icon" />
          </p>
          <p className="count">25000</p>
          <p className="p-txt">Welcome</p>
        </div>
        <div className="second-div">
          <p>
            <IoTime className="dashboard-icon" />
          </p>
          <p className="count">123.50</p>
          <p className="p-txt">Average Time</p>
        </div>
        <div className="third-div">
          <p>
            <IoMdCloudDownload className="dashboard-icon" />
          </p>
          <p className="count">1805</p>
          <p className="p-txt">Collections</p>
        </div>
        <div className="fourth-div">
          <p>
            <FaComments className="dashboard-icon" />
          </p>
          <p className="count">54</p>
          <p className="p-txt">Comments</p>
        </div>
      </div>
      <div className="second-row-container">
        <div className="fb-container">
          <div className="icon-div1">
            <FaFacebookF />
          </div>
          <div className="info-div">
            <span>35k</span>
            <p className="light-txt">Freinds</p>
            <span>128</span>
            <p className="light-txt">Feeds</p>
          </div>
        </div>
        <div className="twitter-container">
          <div className="icon-div2">
            <FaTwitter />
          </div>
          <div className="info-div">
            <span>35k</span>
            <p className="light-txt">Freinds</p>
            <span>128</span>
            <p className="light-txt">Feeds</p>
          </div>
        </div>
        <div className="linkedin-container">
          <div className="icon-div3">
            <FaLinkedinIn />
          </div>
          <div className="info-div">
            <span>35k</span>
            <p className="light-txt">Freinds</p>
            <span>128</span>
            <p className="light-txt">Feeds</p>
          </div>
        </div>
        <div className="google-container">
          <div className="icon-div4">
            <FaGooglePlusG />
          </div>
          <div className="info-div">
            <span>35k</span>
            <p className="light-txt">Freinds</p>
            <span>128</span>
            <p className="light-txt">Feeds</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
