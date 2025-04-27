import Link from 'next/link';

export default function StudentDashboard() {
  // Mock data
  const upcomingAssignments = [
    { id: 1, subject: 'Mathematics', title: 'Calculus Problem Set', dueDate: '2023-06-15' },
    { id: 2, subject: 'Physics', title: 'Forces and Motion', dueDate: '2023-06-18' },
    { id: 3, subject: 'Chemistry', title: 'Periodic Table Quiz', dueDate: '2023-06-20' },
  ];

  const attendanceData = {
    present: 85,
    absent: 5,
    leave: 10,
  };

  const recentAnnouncements = [
    { id: 1, title: 'Annual Sports Day', date: '2023-06-10', content: 'Annual sports day will be held on June 25th.' },
    { id: 2, title: 'Parent-Teacher Meeting', date: '2023-06-08', content: 'PTM scheduled for June 20th.' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Student!</h1>
        <p className="opacity-90">Here's what you need to know today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Assignments */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Assignments</h2>
            <Link 
              href="/dashboard/assignments" 
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingAssignments.map(assignment => (
              <div key={assignment.id} className="border-b border-gray-100 pb-3 last:border-0">
                <h3 className="font-medium text-gray-800">{assignment.title}</h3>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-gray-500">{assignment.subject}</span>
                  <span className="text-sm text-red-500">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Attendance Summary</h2>
            <Link 
              href="/dashboard/attendance" 
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Details
            </Link>
          </div>
          <div className="flex h-40 items-center justify-center">
            <div className="w-40 h-40 relative rounded-full flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#f3f4f6" 
                  strokeWidth="10"
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#4f46e5" 
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 45}
                  strokeDashoffset={2 * Math.PI * 45 * (1 - attendanceData.present / 100)}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-3xl font-bold text-indigo-600">{attendanceData.present}%</div>
                <div className="text-sm text-gray-500">Present</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-4">
            <div>Absent: {attendanceData.absent}%</div>
            <div>On Leave: {attendanceData.leave}%</div>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Announcements</h2>
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">New</span>
          </div>
          <div className="space-y-4">
            {recentAnnouncements.map(announcement => (
              <div key={announcement.id} className="border-l-4 border-indigo-500 pl-3 py-1">
                <h3 className="font-medium text-gray-800">{announcement.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                <span className="text-xs text-gray-400 block mt-1">
                  {new Date(announcement.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              href="/dashboard/timetable" 
              className="p-3 bg-indigo-50 text-indigo-600 rounded-lg text-center hover:bg-indigo-100 transition-colors"
            >
              Timetable
            </Link>
            <Link 
              href="/dashboard/assignments" 
              className="p-3 bg-blue-50 text-blue-600 rounded-lg text-center hover:bg-blue-100 transition-colors"
            >
              Assignments
            </Link>
            <Link 
              href="/dashboard/homework" 
              className="p-3 bg-purple-50 text-purple-600 rounded-lg text-center hover:bg-purple-100 transition-colors"
            >
              Homework
            </Link>
            <Link 
              href="/dashboard/fees" 
              className="p-3 bg-green-50 text-green-600 rounded-lg text-center hover:bg-green-100 transition-colors"
            >
              Fees
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 