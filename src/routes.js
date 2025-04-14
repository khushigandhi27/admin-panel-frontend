import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Upgrade from "./pages/Upgrade";
import UserProfile from "./pages/UserProfile";
import ContentManagement from "./pages/ContentManagement";
import Subscription from "./pages/Subscription";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/upgrade" element={<Upgrade />} />
      <Route path="/user" element={<UserProfile />} />
      <Route path="/content" element={<ContentManagement />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
