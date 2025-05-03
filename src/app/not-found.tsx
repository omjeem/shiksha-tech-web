"use client";

import Footer from '@/components/Landing/Footer';
import Navbar from '@/components/Landing/Navbar';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 py-20">
        <div className="text-center px-6">
          <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
} 