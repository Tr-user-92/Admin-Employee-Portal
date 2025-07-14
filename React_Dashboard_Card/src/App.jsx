import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import Layout from "./Components/Layout";
import Form from "./Components/Form";
import Cards from "./Components/Cards";
import Admin_register from "./Components/Admin_register";
import Admin_login from "./Components/Admin_login";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Components/Dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Admin_login />} />
        <Route path="/register" element={<Admin_register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/form"
            element={
              <Layout>
                <Form />
              </Layout>
            }
          />
          <Route
            path="/cards"
            element={
              <Layout>
                <Cards />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                {/* <h2>Welcome to Dashboard</h2> */}
                <Dashboard/>
              </Layout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
