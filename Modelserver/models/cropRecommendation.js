const fs = require('fs');
const csv = require('csv-parser');
const { RandomForestClassifier } = require('ml-random-forest');

class CropRecommendationModel {
    constructor(dataPath) {
        this.dataPath = dataPath;
        this.labelEncoders = {};
        this.model = null;
        this.data = null;
    }

    async init() {
        await this.loadData();
        await this.preprocessData();
        await this.trainModel();
    }

    async loadData() {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(this.dataPath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    this.data = results;
                    resolve();
                })
                .on('error', reject);
        });
    }

    async preprocessData() {
        const dataFiltered = this.data.map(row => ({
            Crop: row.Crop,
            Season: row.Season,
            State: row.State,
            Area: parseFloat(row.Area),
            Annual_Rainfall: parseFloat(row.Annual_Rainfall),
            Yield: parseFloat(row.Yield)
        }));

        // Create label encoders for categorical columns
        ['Season', 'State'].forEach(col => {
            this.labelEncoders[col] = this.createLabelEncoder(dataFiltered, col);
        });

        // Prepare features and target
        this.X = dataFiltered.map(row => ([
            this.labelEncoders['Season'].encode(row.Season),
            this.labelEncoders['State'].encode(row.State),
            row.Area,
            row.Annual_Rainfall
        ]));

        this.y = dataFiltered.map(row => row.Crop);
        this.cropEncoder = this.createLabelEncoder(dataFiltered, 'Crop');
        this.yEncoded = this.y.map(crop => this.cropEncoder.encode(crop));
    }

    async trainModel() {
        this.model = new RandomForestClassifier({
            nEstimators: 100,
            maxDepth: 10,
            minSamplesSplit: 2
        });

        await this.model.train(this.X, this.yEncoded);
    }

    async recommendCrop(season, state, area, rainfall) {
        const seasonEncoded = this.labelEncoders['Season'].encode(season);
        const stateEncoded = this.labelEncoders['State'].encode(state);

        const inputData = [[seasonEncoded, stateEncoded, area, rainfall]];
        const prediction = await this.model.predict(inputData);
        return this.cropEncoder.decode(prediction[0]);
    }

    createLabelEncoder(data, column) {
        const uniqueValues = [...new Set(data.map(row => row[column]))];
        const valueToIndex = {};
        const indexToValue = {};
        
        uniqueValues.forEach((value, index) => {
            valueToIndex[value] = index;
            indexToValue[index] = value;
        });

        return {
            encode: (value) => valueToIndex[value],
            decode: (index) => indexToValue[index],
            classes: uniqueValues
        };
    }
}

module.exports = { CropRecommendationModel }; 