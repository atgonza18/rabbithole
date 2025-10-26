import { Home, User, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export interface TabBarProps {
  showAdminTab?: boolean;
}

export function TabBar({ showAdminTab = false }: TabBarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      path: "/",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      path: "/profile",
    },
    ...(showAdminTab
      ? [
          {
            id: "admin",
            label: "Admin",
            icon: Settings,
            path: "/admin",
          },
        ]
      : []),
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      {/* iOS-style blur backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800" />

      <div className="relative flex items-center justify-around px-2 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center justify-center flex-1 h-full transition-colors"
            >
              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-lg bg-slate-800/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Icon and label */}
              <div className="relative flex flex-col items-center gap-1">
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    active ? "text-green-400" : "text-slate-400"
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-colors ${
                    active ? "text-green-400" : "text-slate-400"
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
