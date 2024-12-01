import { useState } from "react";
import { AlertTriangle } from "lucide-react";

const EmergencySOSButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emergencyData, setEmergencyData] = useState({
    type: "",
    location: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Emergency alert sent to all users in ${emergencyData.location}`);
    setIsModalOpen(false);
    setEmergencyData({ type: "", location: "", description: "" });
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg transition-all hover:scale-105 active:scale-95"
      >
        <AlertTriangle className="w-6 h-6" />
        <span className="font-semibold">SOS Alert</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Emergency Alert
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Emergency Type
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    value={emergencyData.type}
                    onChange={(e) =>
                      setEmergencyData({
                        ...emergencyData,
                        type: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select type</option>
                    <option value="weather">Severe Weather</option>
                    <option value="pest">Pest Infestation</option>
                    <option value="disease">Crop Disease</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Affected Location
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    value={emergencyData.location}
                    onChange={(e) =>
                      setEmergencyData({
                        ...emergencyData,
                        location: e.target.value,
                      })
                    }
                    placeholder="Enter affected area"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    rows={3}
                    value={emergencyData.description}
                    onChange={(e) =>
                      setEmergencyData({
                        ...emergencyData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe the emergency situation"
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Send Alert
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencySOSButton;
