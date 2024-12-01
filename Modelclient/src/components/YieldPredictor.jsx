import React, { useState } from "react";
import axios from "axios";

const YieldPredictor = () => {
  const [formData, setFormData] = useState({
    crop: "",
    area: "",
    rainfall: "",
    soil_type: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post("/api/predict-yield", {
        crop: formData.crop.trim(),
        area: parseFloat(formData.area),
        rainfall: parseFloat(formData.rainfall),
        soil_type: formData.soil_type,
      });

      setPrediction(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to predict yield");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="crop"
              className="block text-sm font-medium text-gray-700"
            >
              Crop Type
            </label>
            <select
              id="crop"
              name="crop"
              value={formData.crop}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            >
              <option value="">Select a crop</option>
              <option value="rice">Rice</option>
              <option value="wheat">Wheat</option>
              <option value="maize">Maize</option>
              <option value="sugarcane">Sugarcane</option>
              <option value="cotton">Cotton</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700"
            >
              Area (hectares)
            </label>
            <input
              type="number"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              min="0.1"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="rainfall"
              className="block text-sm font-medium text-gray-700"
            >
              Annual Rainfall (mm)
            </label>
            <input
              type="number"
              id="rainfall"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleInputChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="soil_type"
              className="block text-sm font-medium text-gray-700"
            >
              Soil Type
            </label>
            <select
              id="soil_type"
              name="soil_type"
              value={formData.soil_type}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            >
              <option value="">Select soil type</option>
              <option value="loamy">Loamy</option>
              <option value="sandy">Sandy</option>
              <option value="clay">Clay</option>
              <option value="black">Black</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-white rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } transition-colors`}
          >
            {loading ? "Predicting..." : "Predict Yield"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {prediction && (
        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 mb-4">
            Prediction Results
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Crop:</span>
              <span className="font-medium">{prediction.crop}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Area:</span>
              <span className="font-medium">{prediction.area} hectares</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Predicted Yield:</span>
              <span className="font-medium">
                {prediction.predicted_yield.toFixed(2)} tons
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Yield per Hectare:</span>
              <span className="font-medium">
                {(prediction.predicted_yield / prediction.area).toFixed(2)}{" "}
                tons/ha
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YieldPredictor;
