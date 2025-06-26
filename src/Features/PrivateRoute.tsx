import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface PrivateRouteProps {
  children: React.ReactElement;
}

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

const isTokenValid = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const storedUser = localStorage.getItem("ourUser");
  let isAuthenticated = false;

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      const token = user?.token;
      isAuthenticated = token && isTokenValid(token);
    } catch {
      isAuthenticated = false;
    }
  }
  console.log("Authenticated?", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
