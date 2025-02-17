import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center min-h-[200px]">
            <div className="flex flex-col items-center gap-4">
                <i className="fas fa-spinner fa-spin text-primary text-3xl"></i>
                <p className="text-gray-600">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner; 