import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/components/Register"
import Login from "./pages/components/Login"
import Dashboard from "./pages/components/DoctorDashboard"
import DoctorDashboard from "./pages/components/DoctorDashboard"
import PatientDashboard from "./pages/components/PatientDashboard"


function App() {

  return (
   
      <div>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
        {/* <Route path="/book" element={<AppointmentForm />} />
        
         */}
      </Routes>
    </BrowserRouter>
      </div>
    
  )
}

export default App
