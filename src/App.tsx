import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/components/Register";
import Login from "./pages/components/Login";
import PatientDashboard from "./pages/components/PatientDashboard";
import PrivateRoute from "./Features/PrivateRoute";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import Dashboard from "./pages/adminPanel/Dashboard";
import Logout from "./pages/adminPanel/Logout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/doctor"
          element={
            <PrivateRoute allowedRoles={["DOCTOR"]}>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
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
