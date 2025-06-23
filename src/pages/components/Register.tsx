import React, { useState } from "react";
import Api from "../../app/services/Api";
import type { RegisterUserDTO } from "../interface/OurUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Features/store";
import { addUser } from "../../app/services/authServiceSlice";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [userData, setUserData] = useState<RegisterUserDTO>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const submitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addUser(userData)).unwrap();
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 rounded-2xl">
      <div className="bg-green-200 p-6 rounded-3xl shadow-lg w-[60%] md:w-[600px] relative">
        <h2 className="text-xl font-bold text-center mb-5 text-fuchsia-700">
          User Registration
        </h2>

        <form onSubmit={submitUser}>
          <div className="w-full flex flex-wrap -mx-2">
            {/* Name */}
            <div className="w-full flex items-center mb-4">
              <label className="w-1/3 font-semibold">User Name:</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>

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

            {/* Role */}
            <div className="w-full flex items-center mb-4">
              <label className="w-1/3 font-semibold">User Role:</label>
              <select
                value={userData.role}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    role: e.target.value as RegisterUserDTO["role"],
                  })
                }
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select Role</option>
                <option value="DOCTOR">DOCTOR</option>
                <option value="PATIENT">PATIENT</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-35"
          >
            Register
          </button>
          <div>
            Have you regitered? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
