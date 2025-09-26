import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-black text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Section: Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-white mb-4">
              <Eye className="h-7 w-7 text-cyan-400" />
              <span>Eagleye.ai</span>
            </Link>
            <p className="text-sm">
              Smart Vision, Safer Shops. AI-powered CCTV that spots theft in seconds.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Section: Links */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/dashboard/alerts" className="hover:text-white transition-colors">Alerts</Link></li>
                <li><Link to="/dashboard/banned-list" className="hover:text-white transition-colors">Banned List</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/dashboard/audit-log" className="hover:text-white transition-colors">Audit Log</Link></li>
                <li><Link to="/dashboard/compliance" className="hover:text-white transition-colors">Compliance Center</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/dashboard/compliance" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/dashboard/compliance" className="hover:text-white transition-colors">GDPR Information</Link></li>
                <li>
                  <a 
                    href="https://www.gov.uk/government/publications/update-to-surveillance-camera-code" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors"
                  >
                    UK Surveillance Code
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-6 text-sm flex flex-col md:flex-row justify-between items-center gap-2">
          <p>Made with ❤️ by GrabAI Team in Bristol.</p>
          <p>&copy; {currentYear} Eagleye.ai. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;