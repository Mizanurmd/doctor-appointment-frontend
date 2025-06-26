import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/components/Register";
import Login from "./pages/components/Login";
import DoctorDashboard from "./pages/components/DoctorDashboard";
import PatientDashboard from "./pages/components/PatientDashboard";
import PrivateRoute from "./Features/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/doctor"
          element={
            <PrivateRoute>
              <DoctorDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/patient"
          element={
            <PrivateRoute>
              <PatientDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
