import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("ourUser"); 
    navigate("/"); 
  }, [navigate]);

  return null; 
};

export default Logout;
