import React from 'react';

const PageLayout = ({ children, title, className = '' }) => {
  return (
    <main className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {title && (
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-indigo-600 mb-6 sm:mb-8">
            {title}
          </h1>
        )}
        {children}
      </div>
    </main>
  );
};

export default PageLayout;
