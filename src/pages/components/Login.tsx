import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Features/store";
import { loginForUser } from "../../app/services/authServiceSlice";
import type { LoginUserDTO } from "../interface/OurUser";

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

     const role = res?.user?.role;
console.log("Authenticated user role:", role);

      if (role === "DOCTOR") {
        navigate("/doctor");
      } else if (role === "PATIENT") {
        navigate("/patient");
      } else {
        console.warn("Unknown role:", role);
        navigate("/"); // fallback
      }
    } catch (err) {
      alert("Login failed");
      console.error("Login error:", err);
    }
  };

  return (
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
                required
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
                required
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
            <p className="mt-2">
              Not registered?{" "}
              <a
                href="/register"
                className="text-white underline hover:text-red-700"
              >
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
