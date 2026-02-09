'use client';

import { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleSmoothScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md shadow-sm z-50" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <button
            onClick={() => handleSmoothScroll('#home')}
            className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
            aria-label="Go to home section"
          >
            <span className="text-blue-400">Ashish</span> Shende
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleSmoothScroll(item.href)}
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium hover:scale-105 transform"
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
            
            {/* Social Links */}
            <div className="flex space-x-4" role="list" aria-label="Social media links">
              <a
                href="https://github.com/ashishshende"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform"
                aria-label="Visit GitHub profile"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/ashish-shende"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors hover:scale-110 transform"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="mailto:ashish.shende034@gmail.com"
                className="text-gray-300 hover:text-red-400 transition-colors hover:scale-110 transform"
                aria-label="Send email"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-blue-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700 animate-fade-in-down">
            <nav className="flex flex-col space-y-4 px-2" role="navigation" aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleSmoothScroll(item.href)}
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium text-left hover:translate-x-2 transform py-2 px-3 rounded-md hover:bg-gray-800"
                  style={{animationDelay: `${index * 100}ms`}}
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
            
            {/* Mobile Social Links */}
            <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-700" role="list" aria-label="Social media links">
              <a
                href="https://github.com/ashishshende"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform"
                aria-label="Visit GitHub profile"
              >
                <Github className="w-6 h-6" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/ashish-shende"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors hover:scale-110 transform"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="w-6 h-6" aria-hidden="true" />
              </a>
              <a
                href="mailto:ashish.shende034@gmail.com"
                className="text-gray-300 hover:text-red-400 transition-colors hover:scale-110 transform"
                aria-label="Send email"
              >
                <Mail className="w-6 h-6" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}