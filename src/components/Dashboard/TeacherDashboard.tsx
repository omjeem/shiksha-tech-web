import Link from 'next/link';

export default function TeacherDashboard() {
  // Mock data
  const classesToday = [
    { id: 1, className: 'Grade 10-A', subject: 'Mathematics', time: '09:00 - 10:00', room: 'Room 201' },
    { id: 2, className: 'Grade 11-B', subject: 'Physics', time: '11:00 - 12:00', room: 'Room 305' },
    { id: 3, className: 'Grade 9-C', subject: 'Mathematics', time: '14:00 - 15:00', room: 'Room 203' },
  ];

  const pendingTasks = [
    { id: 1, task: 'Grade Physics Quiz', dueDate: '2023-06-15', priority: 'High' },
    { id: 2, task: 'Submit Monthly Report', dueDate: '2023-06-20', priority: 'Medium' },
    { id: 3, task: 'Prepare Lab Materials', dueDate: '2023-06-18', priority: 'Medium' },
  ];

  const attendanceSummary = [
    { class: 'Grade 10-A', present: 28, total: 32 },
    { class: 'Grade 11-B', present: 25, total: 30 },
    { class: 'Grade 9-C', present: 30, total: 34 },
  ];

  const recentSubmissions = [
    { id: 1, student: 'John Doe', assignment: 'Physics Assignment 3', submittedOn: '2023-06-10' },
    { id: 2, student: 'Alice Smith', assignment: 'Mathematics Quiz', submittedOn: '2023-06-09' },
    { id: 3, student: 'Robert Johnson', assignment: 'Lab Report', submittedOn: '2023-06-08' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Teacher!</h1>
        <p className="opacity-90">Here's an overview of your classes and schedule.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Today's Classes</h2>
            <Link 
              href="/dashboard/calendar" 
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              View Schedule
            </Link>
          </div>
          <div className="space-y-3">
            {classesToday.map(classItem => (
              <div key={classItem.id} className="border-l-4 border-indigo-500 pl-3 py-2">
                <h3 className="font-medium text-gray-800">{classItem.subject}</h3>
                <div className="text-sm text-gray-500">{classItem.className}</div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>{classItem.time}</span>
                  <span>{classItem.room}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Pending Tasks</h2>
            <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">{pendingTasks.length} Tasks</span>
          </div>
          <div className="space-y-3">
            {pendingTasks.map(task => (
              <div key={task.id} className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                <div className="h-3 w-3 rounded-full mr-3 flex-shrink-0" 
                  style={{ 
                    backgroundColor: task.priority === 'High' ? '#ef4444' : 
                                     task.priority === 'Medium' ? '#f59e0b' : '#10b981' 
                  }}
                />
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800">{task.task}</h3>
                  <div className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                  {task.priority}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <Link 
              href="/dashboard/tasks" 
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center justify-center"
            >
              <span>View All Tasks</span>
              <span className="ml-1">→</span>
            </Link>
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Today's Attendance</h2>
            <Link 
              href="/dashboard/attendance" 
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Mark Attendance
            </Link>
          </div>
          <div className="space-y-3">
            {attendanceSummary.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <h3 className="font-medium text-gray-800">{item.class}</h3>
                  <div className="text-xs text-gray-500">
                    {item.present} / {item.total} students present
                  </div>
                </div>
                <div className="w-20 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${(item.present / item.total) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Submissions</h2>
            <Link 
              href="/dashboard/assignments" 
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              All Assignments
            </Link>
          </div>
          <div className="space-y-3">
            {recentSubmissions.map(submission => (
              <div key={submission.id} className="p-2 hover:bg-gray-50 rounded-md">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">{submission.student}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(submission.submittedOn).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">{submission.assignment}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              href="/dashboard/assignments/create" 
              className="p-3 bg-indigo-50 text-indigo-600 rounded-lg text-center hover:bg-indigo-100 transition-colors"
            >
              Create Assignment
            </Link>
            <Link 
              href="/dashboard/grades" 
              className="p-3 bg-blue-50 text-blue-600 rounded-lg text-center hover:bg-blue-100 transition-colors"
            >
              Update Grades
            </Link>
            <Link 
              href="/dashboard/attendance" 
              className="p-3 bg-green-50 text-green-600 rounded-lg text-center hover:bg-green-100 transition-colors"
            >
              Mark Attendance
            </Link>
            <Link 
              href="/dashboard/students" 
              className="p-3 bg-purple-50 text-purple-600 rounded-lg text-center hover:bg-purple-100 transition-colors"
            >
              View Students
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 