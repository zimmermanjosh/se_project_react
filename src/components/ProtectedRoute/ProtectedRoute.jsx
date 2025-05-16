// src/components/ProtectedRoute.jsx
import React from "react";
import {  Navigate } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;