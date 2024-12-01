import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface CropFormProps {
  onSubmit: (data: {
    weather: string;
    soil: string;
    season: string;
    crop: string;
  }) => void;
  isLoading: boolean;
}

export function CropForm({ onSubmit, isLoading }: CropFormProps) {
  const [formData, setFormData] = useState({
    weather: '',
    soil: '',
    season: '',
    crop: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="weather" className="block text-sm font-medium text-gray-700">
          Weather Conditions
        </label>
        <input
          type="text"
          id="weather"
          name="weather"
          value={formData.weather}
          onChange={handleChange}
          placeholder="e.g., Hot and humid"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="soil" className="block text-sm font-medium text-gray-700">
          Soil Type
        </label>
        <select
          id="soil"
          name="soil"
          value={formData.soil}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
          required
        >
          <option value="">Select soil type</option>
          <option value="Clay">Clay</option>
          <option value="Sandy">Sandy</option>
          <option value="Loamy">Loamy</option>
          <option value="Silt">Silt</option>
          <option value="Peat">Peat</option>
        </select>
      </div>

      <div>
        <label htmlFor="season" className="block text-sm font-medium text-gray-700">
          Growing Season
        </label>
        <select
          id="season"
          name="season"
          value={formData.season}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
          required
        >
          <option value="">Select season</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
        </select>
      </div>

      <div>
        <label htmlFor="crop" className="block text-sm font-medium text-gray-700">
          Crop Type
        </label>
        <input
          type="text"
          id="crop"
          name="crop"
          value={formData.crop}
          onChange={handleChange}
          placeholder="e.g., Tomatoes"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          'Getting Recommendations...'
        ) : (
          <>
            Get Recommendations
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}