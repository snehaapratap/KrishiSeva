import { Users, Code, Database, Shield } from "lucide-react";
import StatsCard from "../components/StatsCard";
import UsersList from "../components/UsersList";
import { mockUsers } from "./data/mockData";

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold text-green-800 mb-2">
          Admin Developer Dashboard
        </h1>
        <p className="text-green-600">
          Welcome to the developer administration panel. This area is restricted
          to admin developers only.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="System Users"
          value="1,234"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="API Endpoints"
          value="56"
          icon={Code}
          trend={{ value: 3, isPositive: true }}
        />
        <StatsCard
          title="Database Size"
          value="2.3 GB"
          icon={Database}
          trend={{ value: 0.2, isPositive: true }}
        />
        <StatsCard
          title="Security Alerts"
          value="0"
          icon={Shield}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">System Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">CPU Usage</span>
                <span className="text-sm text-gray-500">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Memory Usage</span>
                <span className="text-sm text-gray-500">62%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "62%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-sm text-gray-500">28%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: "28%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent System Logs</h2>
          <div className="space-y-3">
            {[
              {
                time: "2 mins ago",
                message: "Database backup completed",
                type: "success",
              },
              {
                time: "15 mins ago",
                message: "New API endpoint deployed",
                type: "info",
              },
              {
                time: "1 hour ago",
                message: "System update installed",
                type: "info",
              },
              {
                time: "2 hours ago",
                message: "Failed login attempt detected",
                type: "warning",
              },
            ].map((log, index) => (
              <div key={index} className="flex items-center text-sm">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    log.type === "success"
                      ? "bg-green-500"
                      : log.type === "warning"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                ></span>
                <span className="text-gray-500 w-24">{log.time}</span>
                <span className="text-gray-700">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">System Users Overview</h2>
        <UsersList users={mockUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
