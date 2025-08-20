'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './button';
import { Menu, X, User, Shield } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Ashish Shende
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="#skills" className="text-gray-700 hover:text-blue-600 transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-gray-700 hover:text-blue-600 transition-colors">
              Projects
            </Link>
            <Link href="#experience" className="text-gray-700 hover:text-blue-600 transition-colors">
              Experience
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Login Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/admin/login">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Admin
              </Button>
            </Link>
            <Link href="/gym/login">
              <Button size="sm" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Gym Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="#about"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#skills"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </Link>
              <Link
                href="#projects"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="#experience"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Experience
              </Link>
              <Link
                href="#contact"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link href="/admin/login">
                  <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Admin Login
                  </Button>
                </Link>
                <Link href="/gym/login">
                  <Button size="sm" className="w-full flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Gym Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}