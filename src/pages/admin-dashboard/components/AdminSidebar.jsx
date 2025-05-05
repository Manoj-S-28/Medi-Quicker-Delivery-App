import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const navigationItems = [
    {
      name: "Dashboard",
      icon: "LayoutDashboard",
      path: "/admin-dashboard",
    },
    {
      name: "Order Management",
      icon: "PackageCheck",
      path: "/admin-order-management",
    },
    {
      name: "User Management",
      icon: "Users",
      path: "/admin-user-management",
    },
    {
      name: "Inventory",
      icon: "Boxes",
      path: "/admin-inventory",
    },
    {
      name: "Analytics",
      icon: "BarChart2",
      path: "/admin-analytics",
    },
    {
      name: "Support Queries",
      icon: "HelpCircle",
      path: "/admin-support",
    },
    {
      name: "Settings",
      icon: "Settings",
      path: "/admin-settings",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900 bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-neutral-200">
            <Link to="/admin-dashboard" className="flex items-center">
              <div className="bg-primary-600 text-white p-2 rounded-lg mr-2">
                <Icon name="Stethoscope" size={24} />
              </div>
              <span className="font-display font-bold text-xl text-neutral-800">MediQuick</span>
              <span className="ml-1 text-xs bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded">Admin</span>
            </Link>
          </div>
          
          {/* Close button - mobile only */}
          <button 
            className="absolute top-4 right-4 lg:hidden text-neutral-500 hover:text-neutral-700"
            onClick={toggleSidebar}
          >
            <Icon name="X" size={24} />
          </button>
          
          {/* Navigation */}
          <nav className="flex-grow py-6 px-4 overflow-y-auto">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                      location.pathname === item.path
                        ? "bg-primary-50 text-primary-700" :"text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      className={location.pathname === item.path ? "text-primary-600" : ""}
                    />
                    <span className="ml-3 font-medium">{item.name}</span>
                    {item.path === "/admin-dashboard" && location.pathname === item.path && (
                      <span className="ml-auto bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                        Active
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Logout */}
          <div className="p-4 border-t border-neutral-200">
            <button 
              className="flex items-center w-full px-4 py-3 text-neutral-600 hover:bg-neutral-100 rounded-lg transition duration-200" onClick={() => console.log("Logout clicked")}
            >
              <Icon name="LogOut" size={20} />
              <span className="ml-3 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;