
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Gemini Chic Boutique. All rights reserved.</p>
        <p className="text-sm mt-1">An AI-enhanced shopping experience.</p>
      </div>
    </footer>
  );
};

export default Footer;
