import React from 'react';
import user01 from '../assets/user01.png';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center z-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="text-center space-y-8 relative">
        {/* Logo and Title with Animation */}
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold">
            <span className="inline-block animate-[slideIn_0.5s_ease-out]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient-x">
                Snack
              </span>
            </span>
            <span className="inline-block animate-[slideIn_0.5s_ease-out]" style={{ animationDelay: '0.2s' }}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 animate-gradient-x">
                Dash
              </span>
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium tracking-wide animate-[fadeIn_0.5s_ease-out]" style={{ animationDelay: '0.4s' }}>
            Admin Panel
          </p>
        </div>

        {/* Main Image with Enhanced Animation */}
        <div className="relative w-48 h-48 mx-auto group">
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300 animate-[pulse_3s_ease-in-out_infinite]"></div>
          <img
            src={user01}
            alt="Loading"
            className="w-full h-full object-cover rounded-lg shadow-lg relative z-10 group-hover:scale-105 transition-all duration-300 animate-[float_3s_ease-in-out_infinite]"
          />
        </div>

        {/* Loading Text with Enhanced Animation */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <p className="text-gray-700 dark:text-gray-200 font-medium animate-[fadeIn_0.5s_ease-out]" style={{ animationDelay: '0.6s' }}>
              Loading your dashboard
            </p>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
          
          {/* Progress Bar with Enhanced Animation */}
          <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 animate-[loading_5s_ease-in-out,gradient_3s_ease_infinite] bg-[length:200%_200%]"></div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes slideIn {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen; 