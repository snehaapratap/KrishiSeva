const express = require('express');
const cors = require('cors');
const path = require('path');
const { CropRecommendationModel } = require('./models/cropRecommendation');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the server
async function startServer() {
    try {
        // Create and initialize the model
        const dataPath = path.join(__dirname, 'data', 'crop_yield.csv');
        const cropModel = new CropRecommendationModel(dataPath);
        await cropModel.init(); // Wait for model initialization

        app.post('/recommend', async (req, res) => {
            try {
                const { season, state, area, rainfall } = req.body;
                
                // Validate input
                const requiredFields = ['season', 'state', 'area', 'rainfall'];
                for (const field of requiredFields) {
                    if (!(field in req.body)) {
                        return res.status(400).json({ error: `Missing required field: ${field}` });
                    }
                }
                
                // Recommend crop
                const recommendedCrop = await cropModel.recommendCrop(
                    season,
                    state,
                    parseFloat(area),
                    parseFloat(rainfall)
                );
                
                res.json({ recommended_crop: recommendedCrop });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        const PORT = process.env.PORT || 5001;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Start the server
startServer(); 