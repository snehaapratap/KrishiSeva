import React from 'react';

const StatsCard = ({ title, value, icon: Icon, trend }) => {
  const renderTrend = () => {
    if (!trend) return null;
    
    const trendClass = trend.isPositive ? 'text-green-600' : 'text-red-600';
    const trendSymbol = trend.isPositive ? '↑' : '↓';
    
    return (
      <p className={`text-sm mt-2 ${trendClass}`}>
        {trendSymbol} {Math.abs(trend.value)}%
      </p>
    );
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {renderTrend()}
        </div>
        <div className="p-3 bg-green-50 rounded-full">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard; 