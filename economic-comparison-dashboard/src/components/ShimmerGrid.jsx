'use client';
import React from 'react';

export default function ShimmerGrid({ 
  rows = 3, 
  columns = 4, 
  cellWidth = 'w-32', 
  cellHeight = 'h-6', 
  gap = 'gap-4' 
}) {
  return (
    <div className={`flex flex-col space-y-4`}>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className={`flex ${gap}`}>
          {Array.from({ length: columns }).map((_, colIdx) => (
            <div
              key={colIdx}
              className={`bg-gray-200 rounded-md animate-pulse ${cellWidth} ${cellHeight}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
