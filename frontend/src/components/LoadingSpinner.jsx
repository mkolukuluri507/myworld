import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div 
        className={`${sizeClasses[size]} border-2 border-[rgba(35,35,35,0.2)] border-t-[#38FF62] animate-spin`}
        style={{ borderRadius: '0' }} // Keep sharp corners for consistency
      />
      {text && (
        <div className={`font-mono ${textSizeClasses[size]} font-normal text-[rgba(35,35,35,0.7)] uppercase tracking-wider`}>
          {text}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;