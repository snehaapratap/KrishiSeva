import { Home, Users, AlertCircle, LogOut, Tractor } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin-dashboard" },
    { icon: Users, label: "All Users", path: "/admin-dashboard/users" },
    // { icon: Cloud, label: "Weather Reports", path: "/admin-dashboard/weather" },
    {
      icon: AlertCircle,
      label: "Complaints",
      path: "/admin-dashboard/complaints",
    },
    { icon: Tractor, label: "Micro Lending", path: "/admin-dashboard/lending" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-navbar">
      <div className="navbar-container">
        <div className="flex items-center">
          <h2 className="nav-brand">KrishiSeva</h2>
          <nav className="nav-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${
                    isActive
                      ? "nav-link-active"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <Icon className="nav-icon w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <button onClick={handleLogout} className="nav-logout">
          <LogOut className="nav-icon w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
