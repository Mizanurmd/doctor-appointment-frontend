import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { LoginUserDTO } from "../interface/OurUser";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Features/store";
import { loginForUser } from "../../app/services/authServiceSlice";

const Login: React.FC = () => {
  const [userData, setUserData] = useState<LoginUserDTO>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginForUser(userData)).unwrap();
      if (res.role === "DOCTOR") {
        navigate("/doctor");
      } else {
        navigate("/patient");
      }
    } catch (err) {
      alert("Login failed");
      console.error("Login error:", err);
    }
  };

  return (
    // <div className="container mt-4">
    //   <h2>Login</h2>
    //   <form onSubmit={handleLogin}>
    //     <input
    //       className="form-control mb-2"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <button className="btn btn-success">Login</button>
    //   </form>
    // </div>
    <div className="fixed inset-0 flex items-center justify-center z-50 rounded-2xl">
      <div className="bg-green-400 p-6 rounded-3xl shadow-lg w-[60%] md:w-[400px] md:h-[300px] relative">
        <h2 className="text-xl font-bold text-center mb-5 text-fuchsia-700">
          Login User
        </h2>

        <form onSubmit={submitLogin}>
          <div className="w-full flex flex-wrap -mx-2">
            {/* Email */}
            <div className="w-full flex items-center mb-4">
              <label className="w-1/3 font-semibold">User Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {/* Password */}
            <div className="w-full flex items-center mb-4">
              <label className="w-1/3 font-semibold">User Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-35"
            >
              Login
            </button>
            <h1 className="hover:text-red-700">
              Have you regitered? <a href="/register">Register</a>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
