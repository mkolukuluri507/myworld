import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ 
  error, 
  onRetry = null, 
  className = '',
  size = 'md',
  showIcon = true 
}) => {
  const sizeClasses = {
    sm: 'p-3 text-xs',
    md: 'p-4 text-sm',
    lg: 'p-6 text-base'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div className={`bg-white border border-[#FF3838] ${sizeClasses[size]} ${className}`}>
      <div className="flex items-start space-x-3">
        {showIcon && (
          <AlertTriangle 
            size={iconSizes[size]} 
            className="text-[#FF3838] flex-shrink-0 mt-0.5" 
          />
        )}
        
        <div className="flex-grow">
          <div className="font-mono text-xs font-normal text-[#FF3838] uppercase tracking-wider mb-2">
            ERROR
          </div>
          
          <p className="text-[#232323] leading-relaxed mb-3">
            {error || 'Something went wrong. Please try again.'}
          </p>
          
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center space-x-2 bg-transparent border border-[#232323] px-3 py-2 font-mono text-xs font-normal text-[#232323] uppercase tracking-wider cursor-pointer transition-all duration-150 hover:bg-[rgba(35,35,35,0.05)] active:bg-[rgba(35,35,35,0.1)]"
            >
              <RefreshCw size={14} />
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;