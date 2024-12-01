import axios from 'axios';
import { useState, useEffect } from 'react';

const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * @typedef {Object} WeatherData
 * @property {string} location
 * @property {number} temperature
 * @property {number} humidity
 * @property {number} windSpeed
 * @property {string} description
 * @property {string} icon
 */

/**
 * Fetches weather data for a given location
 * @param {string} location - The location to fetch weather for
 * @returns {Promise<WeatherData>} The weather data
 */
export const getWeatherByLocation = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric'
      }
    });

    return {
      location: response.data.name,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw new Error('Failed to fetch weather data');
  }
};

// React hook for weather data
export const useWeather = (location) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getWeatherByLocation(location);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchWeather();
    }
  }, [location]);

  return { weatherData, loading, error };
}; 