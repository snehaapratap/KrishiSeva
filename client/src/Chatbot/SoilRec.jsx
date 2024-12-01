import { useState } from "react";
import axios from "axios";

const SoilRec = () => {
  const [formData, setFormData] = useState({
    cropName: "",
    currentSoilType: "",
    area: "",
  });

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cropTypes = [
    "Rice",
    "Wheat",
    "Corn",
    "Sugarcane",
    "Cotton",
    "Soybeans",
  ];

  const soilTypes = ["Clay", "Sandy", "Loamy", "Black", "Red", "Alluvial"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/soil-recommendation", formData);
      setRecommendation(response.data);
    } catch (e) {
      setError("Failed to get recommendation. Please try again.", e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">
          Soil & Fertilizer Recommendation
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Crop
            </label>
            <select
              name="cropName"
              value={formData.cropName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select a crop</option>
              {cropTypes.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Soil Type
            </label>
            <select
              name="currentSoilType"
              value={formData.currentSoilType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select soil type</option>
              {soilTypes.map((soil) => (
                <option key={soil} value={soil}>
                  {soil}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field Area (in acres)
            </label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
              min="0.1"
              step="0.1"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Getting Recommendation..." : "Get Recommendation"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {recommendation && (
          <div className="mt-6 p-6 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Recommendation for {formData.cropName}
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <p className="text-sm text-gray-600">Nitrogen (N)</p>
                  <p className="text-xl font-semibold text-green-600">
                    {recommendation.nitrogen} kg/acre
                  </p>
                </div>
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <p className="text-sm text-gray-600">Phosphorus (P)</p>
                  <p className="text-xl font-semibold text-green-600">
                    {recommendation.phosphorus} kg/acre
                  </p>
                </div>
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <p className="text-sm text-gray-600">Potassium (K)</p>
                  <p className="text-xl font-semibold text-green-600">
                    {recommendation.potassium} kg/acre
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Recommended Soil Type:</h4>
                <p className="text-green-700 bg-green-100 inline-block px-3 py-1 rounded-full">
                  {recommendation.soil_type}
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Total Requirements:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>
                    Nitrogen:{" "}
                    {(recommendation.nitrogen * formData.area).toFixed(2)} kg
                    total
                  </li>
                  <li>
                    Phosphorus:{" "}
                    {(recommendation.phosphorus * formData.area).toFixed(2)} kg
                    total
                  </li>
                  <li>
                    Potassium:{" "}
                    {(recommendation.potassium * formData.area).toFixed(2)} kg
                    total
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilRec;
