const pandas = require('pandas-js');
const csv = require('csv-parser');
const fs = require('fs');

class DataPreprocessor {
    constructor(filepath) {
        this.filepath = filepath;
        this.data = null;
        this.labelEncoders = {};
        this.means = {};
    }

    async preprocessData() {
        // Load data
        this.data = await this.loadCSV(this.filepath);
        
        // Clean column names
        this.data = this.data.map(row => {
            const cleanRow = {};
            Object.keys(row).forEach(key => {
                cleanRow[key.trim()] = row[key];
            });
            return cleanRow;
        });

        // Handle missing values and scaling
        const numericColumns = ['Area', 'Annual_Rainfall', 'Yield'];
        const categoricalColumns = ['Crop', 'Season', 'State'];

        // Calculate means for numeric columns
        numericColumns.forEach(col => {
            this.means[col] = this.calculateMean(this.data, col);
        });

        // Impute missing values and scale numeric columns
        this.data = this.data.map(row => {
            const newRow = { ...row };
            numericColumns.forEach(col => {
                newRow[col] = parseFloat(row[col]) || this.means[col];
                // Simple scaling (normalize between 0 and 1)
                newRow[col] = this.scale(newRow[col], col);
            });
            return newRow;
        });

        // Encode categorical variables
        categoricalColumns.forEach(col => {
            this.labelEncoders[col] = this.createLabelEncoder(this.data, col);
            this.data = this.data.map(row => ({
                ...row,
                [col]: this.labelEncoders[col].encode(row[col])
            }));
        });

        return this.data;
    }

    async loadCSV(filepath) {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(filepath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', reject);
        });
    }

    calculateMean(data, column) {
        const values = data.map(row => parseFloat(row[column])).filter(val => !isNaN(val));
        return values.reduce((a, b) => a + b, 0) / values.length;
    }

    scale(value, column) {
        const values = this.data.map(row => parseFloat(row[column])).filter(val => !isNaN(val));
        const min = Math.min(...values);
        const max = Math.max(...values);
        return (value - min) / (max - min);
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

    getLabelEncoders() {
        return this.labelEncoders;
    }
}

module.exports = { DataPreprocessor }; 