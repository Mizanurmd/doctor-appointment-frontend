import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../../app/services/authServiceSlice";

import type { RegisterUserDTO } from "../interface/OurUser";
import type { AppDispatch } from "../../Features/store";
import type { ErrorType } from "../constant/errors";
import { fetchRoles } from "../../app/services/roleSlice";
import type { Role } from "../interface/Role";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [roleOptions, setRoleOptions] = useState<Role[]>([]);
  const [userData, setUserData] = useState<RegisterUserDTO>({
    name: "",
    email: "",
    password: "",
    role: null,
  });

  const [selectedRoleId, setSelectedRoleId] = useState<number | "">("");
  const [errors, setErrors] = useState<ErrorType>({});

  // Corrected useEffect with async function
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const roles = await dispatch(fetchRoles()).unwrap();
        setRoleOptions(roles);
      } catch (err) {
        console.error("Failed to fetch roles:", err);
        toast.error("Failed to load roles.");
      }
    };

    loadRoles();
  }, [dispatch]);

  const validate = (): ErrorType => {
    const newErrors: ErrorType = {};
    if (!userData.name.trim()) newErrors.name = "Name is required";
    else if (userData.name.length < 3)
      newErrors.name = "Username must be at least 3 characters";

    if (!userData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(userData.email))
      newErrors.email = "Email format is invalid";

    if (!userData.password.trim()) newErrors.password = "Password is required";
    if (!userData.role) newErrors.role = "Role selection is required";

    return newErrors;
  };

  const submitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await dispatch(addUser(userData)).unwrap();
      toast.success("Register successful!");
      navigate("/");
    } catch (err) {
      toast.error("Register failed. Please try again.");
      console.error(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "role") {
      const roleId = parseInt(value, 10);
      const selectedRole = roleOptions.find((r) => r.id === roleId) || null;
      setUserData((prev) => ({ ...prev, role: selectedRole }));
      setSelectedRoleId(roleId || "");
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (name === "name" && value.trim().length >= 3) delete newErrors.name;
      if (name === "email" && /\S+@\S+\.\S+/.test(value)) delete newErrors.email;
      if (name === "password" && value.trim()) delete newErrors.password;
      if (name === "role" && value !== "") delete newErrors.role;
      return newErrors;
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center rounded-2xl">
      <div className="bg-green-400 p-6 rounded-3xl shadow-lg w-[60%] md:w-[500px] relative">
        <h2 className="text-xl font-bold text-center mb-5 text-fuchsia-700">
          User Registration
        </h2>

        <form onSubmit={submitUser}>
          {/* Name */}
          <div className="mb-4">
            <label className="font-semibold block">User Name:</label>
            <input
              name="name"
              type="text"
              value={userData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border px-3 py-2 rounded"
            />
            {errors.name && <p className="text-red-600">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="font-semibold block">User Email:</label>
            <input
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border px-3 py-2 rounded"
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="font-semibold block">User Password:</label>
            <input
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border px-3 py-2 rounded"
            />
            {errors.password && <p className="text-red-600">{errors.password}</p>}
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="font-semibold block">User Role:</label>
            <select
              name="role"
              value={selectedRoleId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Role</option>
              {roleOptions.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.roleName}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-red-600">{errors.role}</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white hover:text-red-700 px-4 py-2 rounded mt-4"
            >
              Register
            </button>
            <p className="mt-2 hover:text-pink-700">
              Already registered? <Link to="/">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
