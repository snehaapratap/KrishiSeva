import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Settings, Sprout, Bell, LogOut } from "lucide-react";

const UserNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem("loggedInUser");

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/home" },
    { icon: Sprout, label: "My Crops", path: "/home/crops" },
    { icon: Sprout, label: "Micro Lending", path: "/home/lending" },
    { icon: Bell, label: "Helpline", path: "/home/helpline" },
    { icon: Settings, label: "Settings", path: "/home/settings" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-green-600">FarmConnect</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "text-green-600 border-b-2 border-green-600"
                        : "text-gray-500 hover:text-green-600 hover:border-b-2 hover:border-green-600"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 mr-4">Welcome, {username}!</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
