'use client';

import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  userRole: string | null;
  userName?: string;
}

export default function Header({ userRole, userName = 'User' }: HeaderProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Mock notifications
  const notifications = [
    { id: 1, message: 'New assignment posted', time: '5 mins ago' },
    { id: 2, message: 'Attendance marked', time: '1 hour ago' },
    { id: 3, message: 'Upcoming exam reminder', time: '2 days ago' },
  ];

  return (
    <header className="bg-white shadow-sm fixed top-0 right-0 left-0 z-10 h-16" style={{ left: '16rem' }}>
      <div className="h-full px-6 flex items-center justify-between">
        <div>
         {
          userRole &&  <h1 className="text-xl font-semibold text-gray-800">
          {userRole?.charAt(0).toUpperCase() + userRole?.slice(1)} Dashboard
        </h1>
         }
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-64 py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsNotificationOpen(!isNotificationOpen);
                setIsProfileOpen(false);
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-all relative"
            >
              🔔
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 text-center">
                  <Link href="/dashboard/notifications" className="text-sm text-indigo-600 hover:text-indigo-800">
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationOpen(false);
              }}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                {userName.charAt(0)}
              </div>
              <span className="hidden md:inline text-sm font-medium">{userName}</span>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <Link 
                  href="/dashboard/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </Link>
                <Link 
                  href="/dashboard/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <div className="border-t border-gray-100"></div>
                <Link 
                  href="/logout" 
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 