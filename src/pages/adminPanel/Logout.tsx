import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("ourUser"); 
     toast.success("Logout successful!",{
      autoClose: 300,
     });
    navigate("/"); 
  }, [navigate]);

  return null; 
};

export default Logout;
