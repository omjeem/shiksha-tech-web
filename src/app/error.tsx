"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Landing/Navbar';
import Footer from '@/components/Landing/Footer';


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main>
      <Navbar />
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 py-20">
        <div className="text-center px-6">
          <h1 className="text-6xl font-bold text-red-600 mb-4">Error</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Something went wrong!</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            We apologize for the inconvenience. Please try again or go back to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => reset()}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <Link 
              href="/" 
              className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 