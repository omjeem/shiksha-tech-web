'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Role-based navigation items
const studentNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Homework', href: '/dashboard/homework', icon: '📚' },
  { name: 'Assignments', href: '/dashboard/assignments', icon: '📝' },
  { name: 'Attendance', href: '/dashboard/attendance', icon: '📅' },
  { name: 'Fees', href: '/dashboard/fees', icon: '💰' },
  { name: 'Timetable', href: '/dashboard/timetable', icon: '⏰' },
  { name: 'Results', href: '/dashboard/results', icon: '🎓' },
];

const teacherNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Students', href: '/dashboard/students', icon: '👨‍🎓' },
  { name: 'Classes', href: '/dashboard/classes', icon: '🏫' },
  { name: 'Assignments', href: '/dashboard/assignments', icon: '📝' },
  { name: 'Attendance', href: '/dashboard/attendance', icon: '📅' },
  { name: 'Grades', href: '/dashboard/grades', icon: '🎓' },
  { name: 'Calendar', href: '/dashboard/calendar', icon: '📆' },
];

const adminNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Students', href: '/dashboard/students', icon: '👨‍🎓' },
  { name: 'Teachers', href: '/dashboard/teachers', icon: '👨‍🏫' },
  { name: 'Classes', href: '/dashboard/classes', icon: '🏫' },
  { name: 'Fees', href: '/dashboard/fees', icon: '💰' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

interface SidebarProps {
  userRole?: 'student' | 'teacher' | 'admin' | null;
}

export default function Sidebar({ userRole = "admin" }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  // Select nav items based on user role
  let navItems = studentNavItems; // Default


  useEffect(()=>{
    const handleResize = () => {
      console.log("Here is the window width: ", window.innerWidth);
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])
  
  if (userRole === 'teacher') {
    navItems = teacherNavItems;
  } else if (userRole === 'admin') {
    navItems = adminNavItems;
  }

  return (
    <div 
      className={`bg-indigo-900 text-white h-screen transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }  left-0 top-0 bottom-0 fixed z-10`}
    >
      <div className="flex justify-between items-center p-4 border-b border-indigo-800">
        {!isCollapsed && <h1 className="text-xl font-bold">Shiksha Tech</h1>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-indigo-800 transition-all"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      <div className="py-4">
        <div className="mb-6 flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-indigo-700 flex items-center justify-center text-2xl mb-2">
            {userRole === 'student' ? '👨‍🎓' : userRole === 'teacher' ? '👨‍🏫' : '👨‍💼'}
          </div>
          {!isCollapsed && userRole && (
            <div className="text-center">
              <p className="font-semibold">{userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}</p>
              <p className="text-sm text-indigo-300">Portal</p>
            </div>
          )}
        </div>
        
        <nav>
          <ul>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <li key={item.name} className="mb-1">
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 text-sm
                      ${isActive ? 'bg-indigo-800 font-medium' : 'hover:bg-indigo-800/50'}
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      
      <div className=" bottom-0 w-full border-t border-indigo-800 p-4">
        <Link
          href="/logout"
          className={`
            flex items-center text-sm text-indigo-300 hover:text-white
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <span className="mr-3 text-xl">🚪</span>
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
} 