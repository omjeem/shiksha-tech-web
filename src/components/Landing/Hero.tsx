"use client";

import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20 md:py-32">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Shiksha Tech Education
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Comprehensive school management solution for modern educational institutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/register" 
                className="bg-white text-blue-800 hover:bg-blue-100 py-3 px-8 rounded-lg font-semibold transition-all duration-300 text-center"
              >
                Get Started
              </Link>
              <Link 
                href="#features" 
                className="bg-transparent border-2 border-white hover:bg-white/10 py-3 px-8 rounded-lg font-semibold transition-all duration-300 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 shadow-2xl overflow-hidden">
                <Image
                  src="/placeholders/dashboard.svg"
                  alt="Shiksha Tech Dashboard"
                  width={600}
                  height={400}
                  className="rounded-xl"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-2 px-4 rounded-lg transform rotate-3">
                Modern & Efficient
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 