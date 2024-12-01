import React, { useState } from 'react';
import { recommendCrop } from '../services/APIServices';

function CropRecommendationForm() {
  const [formData, setFormData] = useState({
    season: '',
    state: '',
    area: '',
    rainfall: ''
  });
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const result = await recommendCrop(formData);
      setRecommendation(result.recommended_crop);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crop-recommendation-form">
      <h2>Crop Recommendation System</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Season:</label>
          <input
            type="text"
            name="season"
            value={formData.season}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Area (hectares):</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Annual Rainfall:</label>
          <input
            type="number"
            name="rainfall"
            value={formData.rainfall}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Recommending...' : 'Get Recommendation'}
        </button>
      </form>

      {loading && <p>Loading recommendation...</p>}
      {recommendation && (
        <div className="recommendation">
          <h3>Recommended Crop: {recommendation}</h3>
        </div>
      )}
      {error && (
        <div className="error">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
}

export default CropRecommendationForm;