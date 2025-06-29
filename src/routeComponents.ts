// routeComponents.ts
import Dashboard from "./pages/adminPanel/Dashboard";
import DoctorDashboard from "./pages/components/DoctorDashboard";
import PatientDashboard from "./pages/components/PatientDashboard";
import ProfileSettings from "./pages/components/ProfileSettings";
import Security from "./pages/components/Security";



export const routeComponentMap: Record<string, React.FC> = {
  "/admin/dashboard": Dashboard,
  "/appointments": DoctorDashboard,
  "/patient": PatientDashboard,
  "/settings/security": Security,

  "/settings/profile": ProfileSettings,
  // Add more paths & components as needed
};
