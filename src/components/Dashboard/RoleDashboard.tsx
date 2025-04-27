import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import AdminDashboard from './AdminDashboard';

interface RoleDashboardProps {
  userRole: string | null;
}

export default function RoleDashboard({ userRole }: RoleDashboardProps) {
  // Render the appropriate dashboard based on user role
  switch(userRole) {
    case 'teacher':
      return <TeacherDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'student':
    default:
      return <StudentDashboard />;
  }
} 