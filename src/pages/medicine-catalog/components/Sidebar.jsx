import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const navigationItems = [
    {
      name: "Dashboard",
      icon: "LayoutDashboard",
      path: "/user-dashboard",
    },
    {
      name: "Profile",
      icon: "User",
      path: "/user-profile",
    },
    {
      name: "Order History",
      icon: "ClipboardList",
      path: "/order-history",
    },
    {
      name: "Prescriptions",
      icon: "FileText",
      path: "/prescription-upload",
    },
    {
      name: "Medicine Catalog",
      icon: "Pill",
      path: "/medicine-catalog",
    },
    {
      name: "Cart",
      icon: "ShoppingCart",
      path: "/cart-checkout",
    },
    {
      name: "Support",
      icon: "LifeBuoy",
      path: "/support",
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
            <Link to="/user-dashboard" className="flex items-center">
              <div className="bg-primary-600 text-white p-2 rounded-lg mr-2">
                <Icon name="Stethoscope" size={24} />
              </div>
              <span className="font-display font-bold text-xl text-neutral-800">MediQuick</span>
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
                    {item.path === "/medicine-catalog" && location.pathname === item.path && (
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

export default Sidebar;