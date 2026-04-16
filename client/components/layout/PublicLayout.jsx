import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Basic layout wrapper for all public-facing pages.
 * Includes the premium sticky Navbar and consistent Footer.
 * @param {React.ReactNode} children - Page content to render
 */
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar provides high visibility and consistent navigation */}
      <Navbar />
      
      {/* Main content area with top padding for the fixed Navbar height */}
      <main className="flex-grow pt-20 flex flex-col">
        <div className="animate-fade-in flex-grow flex flex-col h-full">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
