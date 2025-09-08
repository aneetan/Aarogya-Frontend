import React from 'react';

const UnauthorizedPage: React.FC = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100">
              <svg 
                className="h-12 w-12 text-red-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Unauthorized Access</h1>
            <p className="mt-4 text-gray-600">
              You don't have permission to access this page. Please contact your administrator if you believe this is an error.
            </p>
          </div>
          
          <div className="mt-8 flex flex-col gap-4">
            <button
              onClick={handleGoBack}
              className="w-full py-3 px-4 rounded-md bg-[var(--primary-color)] text-white font-medium hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={handleGoHome}
              className="w-full py-3 px-4 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Go to Homepage
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;