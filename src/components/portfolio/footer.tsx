'use client';

import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Left - Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              <span className="text-blue-400">Ashish</span> Shende
            </h3>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Senior Full Stack Developer & AI Enthusiast with 12+ years of experience building innovative web solutions.
            </p>
          </div>

          {/* Center - Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#home" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Home</a>
              <a href="#about" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">About</a>
              <a href="#skills" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Skills</a>
              <a href="#projects" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Projects</a>
              <a href="#contact" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Contact</a>
            </div>
          </div>

          {/* Right - Contact & Social */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-3 mb-6">
              <a href="mailto:ashish@example.com" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base break-all">ashish.shende034@gmail.com</span>
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/ashishshende" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.linkedin.com/in/ashish-shende" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-1 text-sm sm:text-base">
            <span>© 2025 Ashish Shende. Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}