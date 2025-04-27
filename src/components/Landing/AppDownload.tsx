"use client";

import Image from 'next/image';
import Link from 'next/link';

const AppDownload = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-500 text-white overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="doodad" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodad)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get the Shiksha Tech App</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-lg">
              Access all features on the go with our mobile app. Stay connected to your school's ecosystem anytime, anywhere.
            </p>
            
            <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
              <Link 
                href="#download-android" 
                className="flex items-center justify-center bg-black hover:bg-gray-900 text-white rounded-lg px-5 py-3 transition duration-300 ease-in-out"
              >
                <div className="mr-3">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    height="24" 
                    width="24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3.18 23.95c-1.14 0-2.03-.89-2.03-1.99V2.04C1.15.94 2.04.05 3.18.05h13.72L22.06 5l.04 16.95c0 1.11-.89 2-2.03 2H3.18z" fill="currentColor"></path>
                    <path d="M22.06 5h-4.99c-1.13 0-2.2-.82-2.2-1.95V.05L22.06 5z" fill="white" fillOpacity="0.35"></path>
                    <g fill="white">
                      <path d="M11.4 16.8l.62-1.11h.01l.59 1.11h.99l-.99-1.66.96-1.59h-.97l-.58 1.03h-.01l-.54-1.03h-1.01l.94 1.59-.99 1.66h.98z"></path>
                      <path d="M16.26 14.8c-.22-.23-.53-.35-.93-.35s-.7.12-.92.35c-.22.23-.33.55-.33.96v.07c0 .42.11.75.34.98.22.24.53.36.92.36s.7-.12.93-.36c.22-.23.33-.56.33-.98v-.07c0-.41-.11-.73-.34-.96zm-.38 1.03c0 .22-.05.39-.14.51-.08.11-.22.17-.4.17s-.32-.06-.4-.17c-.09-.12-.14-.29-.14-.51v-.07c0-.21.04-.38.13-.5.09-.12.22-.18.4-.18s.31.06.4.18c.09.12.14.29.14.5v.07z"></path>
                      <path d="M10.9 14.8c-.22-.23-.53-.35-.93-.35s-.7.12-.92.35c-.22.23-.33.55-.33.96v.07c0 .42.11.75.34.98.22.24.53.36.92.36s.7-.12.93-.36c.22-.23.33-.56.33-.98v-.07c0-.41-.11-.73-.34-.96zm-.38 1.03c0 .22-.05.39-.14.51-.08.11-.22.17-.4.17s-.32-.06-.4-.17c-.09-.12-.14-.29-.14-.51v-.07c0-.21.04-.38.13-.5.09-.12.22-.18.4-.18s.31.06.4.18c.09.12.14.29.14.5v.07z"></path>
                      <path d="M7.95 14.8c-.22-.23-.53-.35-.93-.35s-.7.12-.92.35c-.22.23-.33.55-.33.96v.07c0 .42.11.75.34.98.22.24.53.36.92.36s.7-.12.93-.36c.22-.23.33-.56.33-.98v-.07c0-.41-.11-.73-.34-.96zm-.38 1.03c0 .22-.05.39-.14.51-.08.11-.22.17-.4.17s-.32-.06-.4-.17c-.09-.12-.14-.29-.14-.51v-.07c0-.21.04-.38.13-.5.09-.12.22-.18.4-.18s.31.06.4.18c.09.12.14.29.14.5v.07z"></path>
                      <path d="M13.33 16.8h.72v-3.26h-.72v3.26z"></path>
                      <path d="M15.1 10.89c.1.12.25.18.43.18.17 0 .32-.06.42-.18.1-.11.15-.28.15-.48h-.38c0 .11-.02.19-.05.23-.03.05-.09.07-.15.07-.14 0-.21-.11-.21-.34v-.11h.8v-.21c0-.21-.06-.38-.18-.5-.11-.11-.27-.17-.47-.17s-.36.07-.48.21c-.12.14-.18.33-.18.58v.14c0 .24.06.43.18.57zm.41-.98c.13 0 .2.1.2.29h-.41c0-.19.07-.29.21-.29z"></path>
                      <path d="M6.55 9.45h.75l.5 1.51h.01l.5-1.51h.75v2.25h-.58v-.68l.06-1.02h-.01l-.54 1.7h-.37l-.54-1.7h-.01l.06 1.02v.68h-.58V9.45z"></path>
                      <path d="M10.55 9.45v2.25h-.62l-.71-1.4h-.01l.03.33v1.07h-.58V9.45h.62l.71 1.4h.01l-.03-.33V9.45h.58z"></path>
                      <path d="M12.42 9.45h.62v2.25h-.7l-.64-1.37h-.01l.03.33v1.04h-.62V9.45h.68l.65 1.38h.01l-.03-.34V9.45z"></path>
                      <path d="M14.93 9.45v1.54c0 .24-.06.42-.19.55-.13.13-.31.19-.55.19s-.42-.06-.55-.19c-.13-.13-.19-.31-.19-.55V9.45h.62v1.52c0 .11.02.19.06.24.04.05.11.08.2.08.09 0 .16-.03.19-.08.04-.05.06-.13.06-.24V9.45h.35z"></path>
                      <path d="M17.08 9.45v.47h-.65v1.78h-.62V9.92h-.65v-.47h1.92z"></path>
                      <path d="M13.31 11.91c-.13.13-.32.2-.56.2s-.43-.07-.56-.2c-.13-.14-.2-.33-.2-.57V9.45h.62v1.85c0 .22.11.33.34.33.22 0 .34-.11.34-.33V9.45h.61v1.89c0 .24-.07.43-.2.57z"></path>
                    </g>
                  </svg>
                </div>
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-xl font-semibold">Google Play</div>
                </div>
              </Link>
              
              <Link 
                href="#download-ios" 
                className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg px-5 py-3 transition duration-300 ease-in-out"
              >
                <div className="mr-3">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    height="24" 
                    width="24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.371-1.683-.371-.537 0-1.113.122-1.73.371-.616.25-1.114.381-1.495.393-.577.019-1.153-.242-1.726-.784-.367-.32-.826-.87-1.377-1.648-.59-.829-1.075-1.794-1.455-2.891-.407-1.187-.611-2.335-.611-3.447 0-1.273.275-2.372.823-3.292a4.857 4.857 0 0 1 1.73-1.751 4.65 4.65 0 0 1 2.34-.662c.46 0 1.063.142 1.81.422s1.227.422 1.436.422c.158 0 .689-.167 1.593-.498.853-.307 1.573-.434 2.163-.384 1.6.129 2.801.759 3.6 1.895-1.43.867-2.137 2.08-2.123 3.637.012 1.213.453 2.222 1.317 3.023a4.33 4.33 0 0 0 1.315.863c-.106.307-.218.6-.336.882zM15.998 2.38c0 .95-.348 1.838-1.039 2.659-.836.976-1.846 1.541-2.941 1.452a2.955 2.955 0 0 1-.021-.36c0-.913.396-1.889 1.103-2.688.352-.404.8-.741 1.343-1.009.542-.264 1.054-.41 1.536-.435.013.128.019.255.019.381z"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-xs">Coming soon on</div>
                  <div className="text-xl font-semibold">App Store</div>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Phone mockup */}
              <div className="relative z-10 w-64 md:w-80 transform rotate-6">
                <Image
                  src="/placeholders/app-mockup.svg"
                  alt="Shiksha Tech App"
                  width={320}
                  height={650}
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute top-4 -left-4 w-64 md:w-80 h-full bg-blue-400 rounded-3xl -rotate-3 opacity-30 z-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload; 