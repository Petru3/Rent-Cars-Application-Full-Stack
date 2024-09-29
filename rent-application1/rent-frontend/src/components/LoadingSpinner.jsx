import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-4 border-t-4 border-blue-500 border-dashed rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
