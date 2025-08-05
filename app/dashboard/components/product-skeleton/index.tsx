'use client';
import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-800 shadow-md rounded-2xl overflow-hidden border border-gray-700 animate-pulse"
        >
          <div className="h-50 flex justify-center items-center bg-gray-700">
            <div className="w-[200px] h-[150px] bg-gray-600 rounded-md" />
          </div>

          <div className="p-4 space-y-4">
            <div key={i} className="space-y-1">
              <div className="w-20 h-4 bg-gray-500 rounded" />
              <div className="h-8 bg-gray-600 rounded" />
            </div>
            <div className="space-y-1">
              <div className="w-20 h-4 bg-gray-500 rounded" />
              <div className="h-8 bg-gray-600 rounded" />
            </div>
            <div className="space-y-1">
              <div className="w-20 h-4 bg-gray-500 rounded" />
              <div className="h-8 bg-gray-600 rounded" />
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-1">
              <div className="w-24 h-4 bg-gray-500 rounded" />
              <div className="w-10 h-6 bg-gray-600 rounded-full" />
            </div>
            <div className="flex justify-between items-center">
              <div className="w-24 h-4 bg-gray-500 rounded" />
              <div className="w-10 h-6 bg-gray-600 rounded-full" />
            </div>
          </div>

          <div className="flex justify-around mb-4 px-4">
            <div className="w-24 h-10 bg-gray-600 rounded-xl" />
            <div className="w-24 h-10 bg-gray-600 rounded-xl" />
          </div>
        </div>
      ))}
    </>
  );
};
