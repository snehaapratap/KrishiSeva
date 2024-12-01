
import UserNavbar from "../UserNavbar";

const Settings = () => {
  const userDetails = {
    name: localStorage.getItem("loggedInUser"),
    email: "user@example.com",
    location: "Farm Location",
    joinDate: "January 2024",
    cropTypes: ["Wheat", "Rice", "Corn"],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userDetails.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userDetails.email}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    value={userDetails.location}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Crop Preferences</h3>
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {userDetails.cropTypes.map((crop, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
