import React, { useState } from 'react';
import { Sprout, Calendar } from 'lucide-react';
import { CropForm } from './components/CropForm';
import { RecommendationDisplay } from './components/RecommendationDisplay';
import { getCropRecommendation } from './services/gemini';

interface Plan {
  id: string;
  weather: string;
  soil: string;
  season: string;
  crop: string;
  recommendation: string;
  createdAt: Date;
}

function RecSys() {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);

  const handleSubmit = async (data: {
    weather: string;
    soil: string;
    season: string;
    crop: string;
  }) => {
    try {
      setIsLoading(true);
      const result = await getCropRecommendation(
        data.weather,
        data.soil,
        data.season,
        data.crop
      );
      setRecommendation(result);

      // Save the plan
      const newPlan: Plan = {
        id: Date.now().toString(),
        ...data,
        recommendation: result,
        createdAt: new Date(),
      };
      setPlans([...plans, newPlan]);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Calendar className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold">Create New Plan</h2>
          </div>
          <CropForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {recommendation && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Latest Recommendation</h3>
            <RecommendationDisplay recommendation={recommendation} />
          </div>
        )}

        {plans.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Saved Plans</h3>
            <div className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{plan.crop}</h4>
                      <p className="text-sm text-gray-600">
                        {plan.season} • {plan.soil} soil • {plan.weather} weather
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {plan.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{plan.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecSys;