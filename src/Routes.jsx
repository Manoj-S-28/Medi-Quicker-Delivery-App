import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Import pages
import UserDashboard from "./pages/user-dashboard";
import CartCheckout from "./pages/cart-checkout";
import UserProfile from "./pages/user-profile";
import OrderHistory from "./pages/order-history";
import PrescriptionUpload from "./pages/prescription-upload";
import MedicineCatalog from "./pages/medicine-catalog";
import OrderTracking from "./pages/order-tracking";
import LoginPage from "./pages/login-page";
import RegistrationPage from "./pages/registration-page";
import Home from "./pages/home";
import AdminDashboard from "./pages/admin-dashboard";
import AdminOrderManagement from "./pages/admin-order-management";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <LoginPage /> },
    { path: "/home", element: <Home /> },
    { path: "/user-dashboard", element: <UserDashboard /> },
    { path: "/cart-checkout", element: <CartCheckout /> },
    { path: "/user-profile", element: <UserProfile /> },
    { path: "/order-history", element: <OrderHistory /> },
    { path: "/prescription-upload", element: <PrescriptionUpload /> },
    { path: "/medicine-catalog", element: <MedicineCatalog /> },
    { path: "/order-tracking", element: <OrderTracking /> },
    { path: "/login-page", element: <LoginPage /> },
    { path: "/registration-page", element: <RegistrationPage /> },
    // { path: "/admin-dashboard", element: <AdminDashboard /> },
    // { path: "/admin-order-management", element: <AdminOrderManagement /> },
  ]);

  return element;
};

const Routes = () => {
  return (
    <Router>
      <ScrollToTop />
      <ProjectRoutes />
    </Router>
  );
};

export default Routes;