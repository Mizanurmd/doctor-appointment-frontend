import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/components/Register";
import Login from "./pages/components/Login";
import PatientDashboard from "./pages/components/PatientDashboard";
import PrivateRoute from "./Features/PrivateRoute";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import Dashboard from "./pages/adminPanel/Dashboard";
import Logout from "./pages/adminPanel/Logout";
import { ToastContainer } from "react-toastify";
import DoctorDashboard from "./pages/components/DoctorDashboard";


function App() {
  return (
    
    <BrowserRouter>

      {/* other components */}
      <ToastContainer position="top-center" autoClose={5000} />
    

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

         <Route
          path="/appointments"
          element={
            <PrivateRoute allowedRoles={["USER"]}>
              <DoctorDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/patient"
          element={
            <PrivateRoute allowedRoles={["PATIENT"]}>
              <PatientDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
