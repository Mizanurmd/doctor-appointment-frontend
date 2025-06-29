import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import type { Menu } from "../interface/Menu";
import MenuAPI from "../../app/services/MenuAPI";

const AdminPanel: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const storedUser = localStorage.getItem("ourUser");
        if (!storedUser) return;

        const user = JSON.parse(storedUser);
        if (user.role !== "ADMIN") {
          setMenus([]);
          return;
        }

        const userMenus = await MenuAPI.fetchUserMenus();
        setMenus(userMenus);
      } catch (err) {
        console.error("Failed to load menus", err);
      }
    };
    loadMenus();
  }, []);

  // Group menus
  const parentMenus = menus.filter((m) => m.parentId === null);

  const childMap = menus.reduce((acc, item) => {
    if (item.parentId) {
      if (!acc[item.parentId]) acc[item.parentId] = [];
      acc[item.parentId].push(item);
    }
    return acc;
  }, {} as Record<number, Menu[]>);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {parentMenus.map((menu) => (
            <div key={menu.id}>
              <Link
                to={menu.path}
                className="hover:bg-gray-700 p-2 rounded block"
              >
                {menu.name}
              </Link>
              {childMap[menu.id]?.map((child) => (
                <Link
                  key={child.id}
                  to={child.path}
                  className="ml-4 text-sm hover:bg-gray-700 p-2 rounded block"
                >
                  └ {child.name}
                </Link>
              ))}
            </div>
          ))}
          <Link
            to="/logout"
            className="mt-4 text-red-400 hover:text-red-200 p-2 rounded block"
          >
            Logout
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
