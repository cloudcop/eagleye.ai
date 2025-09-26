import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-black text-gray-400 py-6">
      <div className="container mx-auto px-4 text-center text-sm">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-4">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
          <span className="hidden sm:inline text-gray-600">|</span>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GDPR</a>
          <span className="hidden sm:inline text-gray-600">|</span>
          <a 
            href="https://www.gov.uk/government/publications/update-to-surveillance-camera-code" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-cyan-400 transition-colors"
          >
            UK Surveillance Code
          </a>
        </div>
        <div className="mb-2">
          <p>Made with ❤️ by GrabAI Team in Bristol</p>
        </div>
        <div>
          <p>&copy; {currentYear} Eagleye.ai. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;