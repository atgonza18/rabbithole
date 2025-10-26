import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/user/HomePage";
import ProfilePage from "./pages/user/ProfilePage";
import TheoryReader from "./pages/user/TheoryReader";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TheoryManagement from "./pages/admin/TheoryManagement";
import { TabBar } from "./components/ui/tab-bar";

export default function App() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Apply dark class to html element
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Hide tab bar on certain routes
  const hideTabBar =
    location.pathname.startsWith("/theory/") ||
    location.pathname.startsWith("/admin/theories");

  // Show admin tab for now (TODO: check if user is admin)
  const showAdminTab = true;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/theory/:theoryId" element={<TheoryReader />} />
        <Route path="/theory/:theoryId/section/:sectionId" element={<TheoryReader />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/theories" element={<TheoryManagement />} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* iOS-style Tab Bar */}
      {!hideTabBar && <TabBar showAdminTab={showAdminTab} />}
    </div>
  );
}
