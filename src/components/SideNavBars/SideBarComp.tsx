"use client"
import { SchoolStaffRole_Enum } from '@/utils/types/user';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SideBarPropItems } from './Sidebar';
import { redirect, usePathname } from 'next/navigation';
import { removeToken } from '@/utils/nextCookies';


export default function SidebarComponent(
    {
        navItems,
        userRole
    }
        :
        {
            navItems: SideBarPropItems[],
            userRole: SchoolStaffRole_Enum | null
        }
) {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(true);
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;


    useEffect(() => {
        const handleResize = () => {
            // if (window.innerWidth <= 768) {
            //     setIsCollapsed(true);
            // } else {
            //     setIsCollapsed(false);
            // }
            setIsCollapsed(true)
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const handelLogOut = async () => {
        await removeToken()
        redirect("/login")
    }


    return (
        <div
            onMouseOver={() => {
                console.log("Collasped >> ")
                setIsCollapsed(false)
            }}
            onMouseOut={() => setIsCollapsed(true)}
            className={`z-10 bg-indigo-900 text-white h-screen transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
                }  left-0 top-0 bottom-0 fixed z-10`}
        >
            <div className="flex justify-between items-center p-4 border-b border-indigo-800">
                {!isCollapsed && <h1 className="text-xl font-bold">Shiksha Tech</h1>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-full hover:bg-indigo-800 transition-all"
                >
                    {/* {isCollapsed ? '→' : '←'} */}
                </button>
            </div>

            <div className="py-4 h-full">
                <div className="mb-6 flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-indigo-700 flex items-center justify-center text-2xl mb-2">
                        {userRole === SchoolStaffRole_Enum.STUDENT ? '👨‍🎓' : userRole === SchoolStaffRole_Enum.TEACHER ? '👨‍🏫' : '👨‍💼'}
                    </div>
                    {!isCollapsed && userRole && (
                        <div className="text-center">
                            <p className="font-semibold">{userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}</p>
                            <p className="text-sm text-indigo-300">Portal</p>
                        </div>
                    )}
                </div>

                <nav className='flex flex-col justify-between'>
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
                    <div onClick={handelLogOut} className="w-full cursor-pointer border-t border-indigo-800 p-4">
                        <div
                            className={`
            flex items-center text-sm text-indigo-300 hover:text-white
            ${isCollapsed ? 'justify-center' : ''}
          `}
                        >
                            <span className="mr-3 text-xl">🚪</span>
                            {!isCollapsed && <span>Logout</span>}
                        </div>
                    </div >
                </nav>


            </div>
        </div>
    );
} 