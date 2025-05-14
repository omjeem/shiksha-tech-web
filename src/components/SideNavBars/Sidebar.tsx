import { getUserRole } from '@/utils/nextCookies';
import { SchoolStaffRole_Enum } from '@/utils/types/user';
import Link from 'next/link';
import SidebarComponent from './SideBarComp';


export interface SideBarPropItems {
  name: string,
  href: string,
  icon: string
}
// Role-based navigation items
const studentNavItems : SideBarPropItems[] = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Homework', href: '/dashboard/homework', icon: '📚' },
  { name: 'Assignments', href: '/dashboard/assignments', icon: '📝' },
  { name: 'Attendance', href: '/dashboard/attendance', icon: '📅' },
  { name: 'Fees', href: '/dashboard/fees', icon: '💰' },
  { name: 'Timetable', href: '/dashboard/timetable', icon: '⏰' },
  { name: 'Results', href: '/dashboard/results', icon: '🎓' },
];

const teacherNavItems : SideBarPropItems[] = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Students', href: '/dashboard/students', icon: '👨‍🎓' },
  { name: 'Classes', href: '/dashboard/classes', icon: '🏫' },
  { name: 'Assignments', href: '/dashboard/assignments', icon: '📝' },
  { name: 'Attendance', href: '/dashboard/attendance', icon: '📅' },
  { name: 'Grades', href: '/dashboard/grades', icon: '🎓' },
  { name: 'Calendar', href: '/dashboard/calendar', icon: '📆' },
];

const adminNavItems : SideBarPropItems[] = [
  { name: 'Students', href: '/admin/students', icon: '👨‍🎓' },
  { name: 'Classes', href: '/admin/classes', icon: '🏫' },
  // { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  // { name: 'Teachers', href: '/admin/teachers', icon: '👨‍🏫' },
  // { name: 'Fees', href: '/admin/fees', icon: '💰' },
  // { name: 'Analytics', href: '/admin/analytics', icon: '📈' },
  // { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
];


export default async function Sidebar() {

  let navItems = studentNavItems; 

  const userRole = await getUserRole()
  if (userRole === SchoolStaffRole_Enum.STUDENT) {
    navItems = studentNavItems
  } else if (userRole === SchoolStaffRole_Enum.TEACHER) {
    navItems = teacherNavItems
  } else {
    navItems = adminNavItems
  }


  return (
    <SidebarComponent  navItems={navItems} userRole={userRole}/>
  );
} 