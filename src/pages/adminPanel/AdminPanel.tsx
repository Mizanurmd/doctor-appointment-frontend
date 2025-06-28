import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminPanel: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <Link to="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/admin/users" className="hover:bg-gray-700 p-2 rounded">
            Manage Users
          </Link>
          <Link to="/admin/projects" className="hover:bg-gray-700 p-2 rounded">
            Projects
          </Link>
          <Link to="/admin/settings" className="hover:bg-gray-700 p-2 rounded">
            Settings
          </Link>
          <Link to="/logout" className="mt-4 text-red-400 hover:text-red-200 p-2 rounded">
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
