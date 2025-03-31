"use client";

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-gray-800 font-bold text-xl">Shiksha Tech</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
              Features
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
              Pricing
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
              Contact
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
              Login
            </Link>
            <Link 
              href="/register" 
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                Features
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                Pricing
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                Contact
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-block text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 