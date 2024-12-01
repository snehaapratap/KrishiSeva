import { Link, useNavigate } from "react-router-dom";
import { Home as HomeIcon, Settings, Sprout, LogOut } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("loggedInUser");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { icon: HomeIcon, label: "Dashboard", path: "/home" },
    { icon: Sprout, label: "My Crops", path: "/home/crops" },
    { icon: Sprout, label: "Micro Lending", path: "/home/lending" },
    { icon: Settings, label: "Settings", path: "/home/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-green-600">
KrishiSeva                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-green-600"
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
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-green-50">
                <span className="flex items-center">
                  {/* <Tool className="w-5 h-5 mr-3 text-green-600" /> */}
                  Create Lending Request
                </span>
                <span className="text-green-600">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-green-50">
                <span className="flex items-center">
                  <Sprout className="w-5 h-5 mr-3 text-green-600" />
                  Add New Crop
                </span>
                <span className="text-green-600">→</span>
              </button>
            </div>
          </div>

          {/* Weather Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Weather Update</h2>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-700">23°C</p>
              <p className="text-gray-500">Partly Cloudy</p>
              <p className="mt-2 text-sm text-gray-600">
                Perfect weather for crop maintenance
              </p>
            </div>
          </div>

          {/* Active Requests Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Active Requests</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-green-700">
                  Tractor Rental Request
                </span>
                <span className="text-xs text-green-600">Pending</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-700">
                  Seed Purchase Request
                </span>
                <span className="text-xs text-blue-600">In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
