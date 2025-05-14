// 'use client';

// import { useEffect, useState } from 'react';
// import Sidebar from '../SideNavBars/Sidebar';
// import Header from './Header';

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
//   const [userRole, setUserRole] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Get user role from the cookies
//     // const role = getUserRole();
//     // setUserRole(role);
//     // setIsLoading(false);
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   // If no user role is found, redirect to login
//   if (!userRole) {
//     // In a client component, you need to use useRouter for programmatic navigation
//     // But since we're already returning a different UI, we can just show a message
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
//         <p className="mb-4">You need to be logged in to access this page.</p>
//         <a 
//           href="/login" 
//           className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
//         >
//           Go to Login
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Sidebar userRole={userRole as 'student' | 'teacher' | 'admin'} />
      
//       <div className="ml-64"> {/* This should match the width of the sidebar */}
//         <Header userRole={userRole} />
        
//         <main className="pt-24 pb-10 px-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// } 