import { useState } from "react";
import PropTypes from "prop-types";
import {
  Plus,
  Sprout,
  AlertCircle,
  Leaf,
  BarChart,
  Calendar,
} from "lucide-react";
import UserNavbar from "../UserNavbar";
import RecSys from "../../../../recSys/src/App";
import YieldPredictor from "../../../../Modelclient/src/components/YieldPredictor";
import SoilRec from "../../Chatbot/SoilRec";

const Modal = ({ isOpen, onClose, title, description, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl m-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const MyCrops = () => {
  const [crops, setCrops] = useState([
    {
      id: 1,
      name: "Wheat",
      area: "5 acres",
      stage: "Growing",
      plantedDate: "2024-01-15",
      expectedHarvest: "2024-06-15",
    },
    {
      id: 2,
      name: "Rice",
      area: "3 acres",
      stage: "Harvesting",
      plantedDate: "2023-12-01",
      expectedHarvest: "2024-03-15",
    },
    {
      id: 3,
      name: "Corn",
      area: "4 acres",
      stage: "Seeding",
      plantedDate: "2024-02-01",
      expectedHarvest: "2024-07-01",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showSoilRecModal, setShowSoilRecModal] = useState(false);
  const [showCropRecModal, setShowCropRecModal] = useState(false);
  const [showPlannerModal, setShowPlannerModal] = useState(false);
  const [showYieldModal, setShowYieldModal] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: "",
    area: "",
    plantedDate: "",
    expectedHarvest: "",
  });

  const handleAddCrop = () => {
    setCrops([
      ...crops,
      { ...newCrop, id: crops.length + 1, stage: "Seeding" },
    ]);
    setShowAddModal(false);
    setNewCrop({ name: "", area: "", plantedDate: "", expectedHarvest: "" });
  };

  const handleDeleteCrop = (cropId) => {
    setCrops(crops.filter((crop) => crop.id !== cropId));
  };

  const handleEditCrop = (cropId, updatedData) => {
    setCrops(
      crops.map((crop) =>
        crop.id === cropId ? { ...crop, ...updatedData } : crop
      )
    );
  };

  const features = [
    {
      icon: Sprout,
      title: "Soil Analysis",
      description: "Get detailed NPK recommendations for your crops",
      color: "bg-green-100 text-green-600",
      action: () => setShowSoilRecModal(true),
    },
    {
      icon: Calendar,
      title: "Crop Planner",
      description: "AI-powered crop planning and recommendations",
      color: "bg-purple-100 text-purple-600",
      action: () => setShowPlannerModal(true),
    },
    {
      icon: BarChart,
      title: "Yield Prediction",
      description: "Predict potential yield based on soil conditions",
      color: "bg-blue-100 text-blue-600",
      action: () => setShowYieldModal(true),
    },
    {
      icon: AlertCircle,
      title: "Health Monitoring",
      description: "Monitor crop health and get early warnings",
      color: "bg-orange-100 text-orange-600",
      action: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="pt-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Crops</h2>
              <p className="text-gray-600 mt-1">
                Manage your crops and get smart recommendations
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Crop
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onClick={feature.action}
                  className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all ${
                    feature.action
                      ? "cursor-pointer transform hover:-translate-y-1"
                      : ""
                  } ${index < 2 ? "border-2 border-green-200" : ""}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                  {feature.action && (
                    <button className="mt-4 text-green-600 font-medium hover:text-green-700 flex items-center">
                      Try Now
                      <Leaf className="w-4 h-4 ml-2" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Modals */}
          <Modal
            isOpen={showSoilRecModal}
            onClose={() => setShowSoilRecModal(false)}
            title="Soil Analysis"
            description="Get detailed soil recommendations"
          >
            <SoilRec />
          </Modal>

          <Modal
            isOpen={showYieldModal}
            onClose={() => setShowYieldModal(false)}
            title="Yield Prediction"
            description="Predict your crop yield based on area and conditions"
          >
            <YieldPredictor />
          </Modal>

          <Modal
            isOpen={showCropRecModal}
            onClose={() => setShowCropRecModal(false)}
            title="Smart Crop Recommendations"
            description="Get AI-powered crop suggestions based on your conditions"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4">
                  Crop Recommendation
                </h4>
                <RecSys />
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4">Historical Data</h4>
                <div className="space-y-4">
                  {crops.map((crop) => (
                    <div
                      key={crop.id}
                      className="p-4 bg-white rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{crop.name}</span>
                        <span className="text-sm text-gray-600">
                          {crop.area}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        Yield: {crop.yield || "N/A"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={showPlannerModal}
            onClose={() => setShowPlannerModal(false)}
            title="Crop Planner"
            description="Plan your crops with AI-powered recommendations"
          >
            <RecSys />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MyCrops;
