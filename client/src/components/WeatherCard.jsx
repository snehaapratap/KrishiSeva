import React from 'react';
import { Thermometer, Wind, Droplets } from 'lucide-react';

const WeatherCard = ({ weather }) => {
  const renderWeatherMetric = (Icon, label, value, unit) => (
    <div className="flex items-center">
      <Icon className="w-5 h-5 text-gray-500 mr-2" />
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}{unit}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{weather.location}</h3>
          <div className="flex items-center mt-2">
            <img 
              src={`http://openweathermap.org/img/w/${weather.icon}.png`}
              alt="Weather icon"
              className="w-16 h-16"
            />
            <span className="text-3xl font-bold ml-2">{Math.round(weather.temperature)}°C</span>
          </div>
          <p className="text-gray-600 capitalize mt-2">{weather.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        {renderWeatherMetric(Thermometer, 'Temperature', Math.round(weather.temperature), '°C')}
        {renderWeatherMetric(Droplets, 'Humidity', weather.humidity, '%')}
        {renderWeatherMetric(Wind, 'Wind Speed', weather.windSpeed, ' m/s')}
      </div>
    </div>
  );
};

export default WeatherCard; 