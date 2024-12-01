import { useState } from "react";
import { Phone, MessageSquare, Video, Clock } from "lucide-react";

const Helpline = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Crop Disease Specialist",
      available: true,
    },
    {
      id: 2,
      name: "Mr. Robert Chen",
      specialty: "Soil Expert",
      available: true,
    },
    {
      id: 3,
      name: "Dr. Maria Garcia",
      specialty: "Pest Control Expert",
      available: false,
    },
    {
      id: 4,
      name: "Mr. John Smith",
      specialty: "Agricultural Engineer",
      available: true,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Helpline Support</h2>
        <p className="text-gray-600">
          Connect with agricultural experts for immediate assistance
        </p>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <Phone className="w-6 h-6 text-red-600 mr-3" />
          <div>
            <h3 className="font-semibold text-red-700">Emergency Helpline</h3>
            <p className="text-red-600">1-800-FARM-HELP (Available 24/7)</p>
          </div>
        </div>
      </div>

      {/* Expert Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {["All Experts", "Crop Disease", "Soil Analysis", "Pest Control"].map(
          (category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`p-4 rounded-lg text-left ${
                selectedCategory === category.toLowerCase()
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-white border-gray-200 text-gray-700"
              } border hover:shadow-sm transition-all`}
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* Available Experts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <div key={expert.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{expert.name}</h3>
                <p className="text-sm text-gray-600">{expert.specialty}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  expert.available
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {expert.available ? "Available" : "Busy"}
              </span>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Video className="w-4 h-4 mr-2" />
                Video Call
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Clock className="w-4 h-4 mr-2" />
                Schedule Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Helpline;
