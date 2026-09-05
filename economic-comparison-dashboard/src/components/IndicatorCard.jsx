import React from 'react';

const IndicatorCard = ({ title, value, unit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center w-full transition hover:shadow-xl">
      <h3 className="text-md md:text-lg font-semibold text-gray-700 mb-2">
        {title}
      </h3>
      <p className="text-3xl md:text-4xl font-bold text-blue-600">
        {value}
        <span className="text-base md:text-lg font-medium text-gray-500 ml-1">
          {unit}
        </span>
      </p>
    </div>
  );
};

export default IndicatorCard;
