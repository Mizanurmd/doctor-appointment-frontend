import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Features/store";
import { loginForUser } from "../../app/services/authServiceSlice";
import type { LoginUserDTO } from "../interface/OurUser";
import { toast } from "react-toastify";
import type { ErrorType } from "../constant/errors";

const Login: React.FC = () => {
  const [userData, setUserData] = useState<LoginUserDTO>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ErrorType>({});

  //===================== Start Validation ==========================//
  const loginValidate = () => {
    const newErrors: ErrorType = {};

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!userData.password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };
  //===================== End Validation ==========================//

  //===================== Start handleChange ==========================//
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time error cleanup
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "email" && /\S+@\S+\.\S+/.test(value)) {
        delete newErrors.email;
      }
      if (name === "password" && value.trim()) {
        delete newErrors.password;
      }
      return newErrors;
    });
  };
  //===================== End handleChange ==========================//

  //===================== Start Login submit ==========================//
  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = loginValidate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await dispatch(loginForUser(userData)).unwrap();
      localStorage.setItem(
        "ourUser",
        JSON.stringify({
          token: res.token,
          refreshToken: res.refreshToken,
          role: res.role, // role object
        })
      );

      const roleName = res?.role?.roleName?.toUpperCase();
      console.log("Authenticated user role:", roleName);

      toast.success("Login successful!");

      if (roleName === "ADMIN") {
        navigate("/admin");
      } else if (roleName === "USER") {
        navigate("/appointments");
      } else if (roleName === "PATIENT") {
        navigate("/patient");
      } else {
        toast.error("Unknown role. Redirecting to home.");
        navigate("/");
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  //===================== End submit login ==========================//

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
              {errors.email && <p className="text-red-600">{errors.email}</p>}
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
              {errors.password && (
                <p className="text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
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
