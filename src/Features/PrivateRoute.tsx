import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  // Get user info from localStorage
  const storedUser = localStorage.getItem("ourUser");
  if (!storedUser) {
    // No user logged in, redirect to login
    return <Navigate to="/" replace />;
  }

  // Parse stored user
  const authData = JSON.parse(storedUser);

  // The user role might be in authData.user.role or authData.role depending on your storage structure
  // Adjust accordingly:
  const userRole: string | undefined =
    authData?.user?.role || authData?.role || undefined;

  // Check if role is allowed (if roles provided)
  if (allowedRoles && !allowedRoles.includes(userRole || "")) {
    // Role not authorized, redirect or show unauthorized page
    return <Navigate to="/" replace />;
  }

  // Authenticated and authorized, render child components
  return children;
};

export default PrivateRoute;
