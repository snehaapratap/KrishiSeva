import React, { useState } from 'react';
import axios from 'axios';

const YieldPredictor = () => {
    const [formData, setFormData] = useState({
        crop: '',
        area: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setPrediction(null);

        try {
            // Validate input
            if (!formData.crop || !formData.area || parseFloat(formData.area) <= 0) {
                throw new Error('Please provide a valid crop name and area.');
            }

            // Make API call to backend
            const response = await axios.post('/api/predict', {
                crop: formData.crop.trim(),
                area: parseFloat(formData.area)
            });

            setPrediction(response.data);
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        }
    };

    return (
        <div className="yield-predictor">
            <h2>Crop Yield Predictor</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="crop">Crop Name:</label>
                    <input
                        type="text"
                        id="crop"
                        name="crop"
                        value={formData.crop}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="area">Area (in hectares):</label>
                    <input
                        type="number"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        min="0.1"
                        step="0.1"
                        required
                    />
                </div>

                <button type="submit">Predict Yield</button>
            </form>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {prediction && (
                <div className="prediction-result">
                    <h3>Prediction Results:</h3>
                    <p>Crop: {prediction.crop}</p>
                    <p>Area: {prediction.area} hectares</p>
                    <p>Predicted Yield: {prediction.predicted_yield.toFixed(2)} tons</p>
                </div>
            )}
        </div>
    );
};

export default YieldPredictor;