import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/components/Register";
import Login from "./pages/components/Login";
import Logout from "./pages/adminPanel/Logout";
import PrivateRoute from "./Features/PrivateRoute";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import { ToastContainer } from "react-toastify";
import { routeComponentMap } from "./routeComponents";
import Security from "./pages/components/Security";

interface MenuItem {
  path: string;
  role: string;
}

const getMenuRoutes = (): MenuItem[] => {
  const storedUser = localStorage.getItem("ourUser");
  if (!storedUser) return [];

  try {
    const parsed = JSON.parse(storedUser);
    const menus: MenuItem[] = parsed?.menus || [];
    return menus;
  } catch {
    return [];
  }
};

function App() {
  const dynamicMenus = getMenuRoutes();

  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={5000} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        {/* Admin Layout Wrapper */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route path="/settings" element={<Security />}>
          <Route
            path="security"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <AdminPanel />
              </PrivateRoute>
            }
          />
        </Route>
        {/* Dynamically rendered menu-based routes */}
        console.log("Dynamic menus from localStorage:", dynamicMenus);
        {dynamicMenus.map((menu) => {
          const Component = routeComponentMap[menu.path];
          if (!Component) {
            console.warn(`No component found for path: ${menu.path}`);
            return null;
          }

          return (
            <Route
              key={menu.path}
              path={menu.path}
              element={
                <PrivateRoute allowedRoles={[menu.role]}>
                  <Component />
                </PrivateRoute>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
