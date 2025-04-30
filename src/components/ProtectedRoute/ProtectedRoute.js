// src/components/ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, isLoggedIn, ...props }) {
  return (
    <Route {...props} element={isLoggedIn ? <Component {...props} /> : <Navigate to="/" replace />} />
  );
}

export default ProtectedRoute;