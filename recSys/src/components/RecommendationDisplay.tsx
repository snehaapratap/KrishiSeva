import React from 'react';


interface RecommendationDisplayProps {
  recommendation: string | null;
}

export function RecommendationDisplay({ recommendation }: RecommendationDisplayProps) {
  if (!recommendation) return null;

  return (
    <div className="mt-8 w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        
        <h2 className="text-xl font-semibold text-gray-800">Crop Recommendations</h2>
      </div>
      <div className="prose prose-green">
        {recommendation.split('\n').map((line, index) => (
          <p key={index} className="text-gray-600">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}