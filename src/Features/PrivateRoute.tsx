import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const storedUser = localStorage.getItem("ourUser");

  if (!storedUser) {
    return <Navigate to="/" replace />;
  }

  let userRole: string | undefined;

  try {
    const authData = JSON.parse(storedUser);

    // Try accessing nested roleName from role object
    if (typeof authData?.role === "object" && authData.role?.roleName) {
      userRole = authData.role.roleName.toUpperCase();
    } else if (typeof authData?.user?.role === "object" && authData.user.role?.roleName) {
      userRole = authData.user.role.roleName.toUpperCase();
    } else if (typeof authData?.role === "string") {
      userRole = authData.role.toUpperCase();
    } else if (typeof authData?.user?.role === "string") {
      userRole = authData.user.role.toUpperCase();
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
    return <Navigate to="/" replace />;
  }

  // Check allowed roles
  if (allowedRoles && !allowedRoles.includes(userRole || "")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
