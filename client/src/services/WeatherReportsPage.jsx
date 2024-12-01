import React, { useState } from "react";
import { Search } from "lucide-react";
import { getWeatherByLocation } from "./weatherService";
import WeatherCard from "../../components/WeatherCard";

const WeatherReportsPage = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const weatherData = await getWeatherByLocation(location);
      setWeather(weatherData);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Weather Reports</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (e.g., London, GB)"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? (
              "Loading..."
            ) : (
              <div className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Search
              </div>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default WeatherReportsPage;
