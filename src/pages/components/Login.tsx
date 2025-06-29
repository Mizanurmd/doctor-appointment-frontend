import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Features/store";
import { loginForUser } from "../../app/services/authServiceSlice";
import type { LoginUserDTO } from "../interface/OurUser";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [userData, setUserData] = useState<LoginUserDTO>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  //Only enable login when email is valid and password is not empty
  const isFormValid = useMemo(() => {
    const isEmailValid = /\S+@\S+\.\S+/.test(userData.email.trim());
    const isPasswordValid = userData.password.trim();
    return isEmailValid && isPasswordValid;
  }, [userData.email, userData.password]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await dispatch(loginForUser(userData)).unwrap();

      //Store token, role, and menus
      localStorage.setItem(
        "ourUser",
        JSON.stringify({
          token: res.token,
          refreshToken: res.refreshToken,
          role: res.role,
          menus: res.menus,
        })
      );

      const roleName = res?.role?.roleName?.toUpperCase();
      switch (roleName) {
        case "ADMIN":
          toast.success("Login successful!", {
            autoClose: 300,
          });
          navigate("/admin");
          break;
        case "USER":
         toast.success("Login successful!", {
            autoClose: 300,
          });
          navigate("/settings/security");
          break;
        default:
          toast.error("Unauthorized role.",{
            autoClose: 300,
          });
          navigate("/");
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 rounded-2xl">
      <div className="bg-green-400 p-6 rounded-3xl shadow-lg w-[60%] md:w-[400px] relative">
        <h2 className="text-xl font-bold text-center mb-5 text-fuchsia-700">
          Login User
        </h2>

        <form onSubmit={submitLogin}>
          <div className="w-full flex flex-wrap -mx-2">
            {/* Email */}
            <div className="w-full mb-4">
              <label className="block font-semibold">User Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {/* Password */}
            <div className="w-full mb-4">
              <label className="block font-semibold">User Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={userData.password}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`${
                isFormValid
                  ? "bg-blue-600 hover:bg-red-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white px-4 py-2 rounded mt-4`}
            >
              Login
            </button>

            <p className="mt-2 hover:text-red-700">
              Not registered? <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
