// src/components/ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;