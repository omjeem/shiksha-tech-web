import Link from 'next/link';

export default function AdminDashboard() {
  // Mock data
  const schoolStats = {
    students: 1250,
    teachers: 78,
    classes: 45,
    departments: 8,
  };

  const recentAdmissions = [
    { id: 1, name: 'Sarah Johnson', class: 'Grade 9-A', date: '2023-06-08', status: 'Completed' },
    { id: 2, name: 'Michael Smith', class: 'Grade 10-B', date: '2023-06-07', status: 'Pending' },
    { id: 3, name: 'Emma Davis', class: 'Grade 8-C', date: '2023-06-05', status: 'Completed' },
  ];

  const pendingRequests = [
    { id: 1, type: 'Leave Request', from: 'Ms. Jennifer Lee', date: '2023-06-10', urgent: true },
    { id: 2, type: 'Resource Requisition', from: 'Science Department', date: '2023-06-08', urgent: false },
    { id: 3, type: 'Schedule Change', from: 'Mr. Robert Brown', date: '2023-06-07', urgent: false },
  ];

  const feeCollection = {
    collected: 8720000,
    pending: 1250000,
    total: 9970000,
    percentCollected: 87.5,
  };

  // Monthly student attendance data for chart
  const attendanceByMonth = [
    { month: 'Jan', percentage: 92 },
    { month: 'Feb', percentage: 94 },
    { month: 'Mar', percentage: 91 },
    { month: 'Apr', percentage: 88 },
    { month: 'May', percentage: 90 },
    { month: 'Jun', percentage: 93 },
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="opacity-90">School overview and management controls</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{schoolStats.students}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600 text-xl">👨‍🎓</div>
          </div>
          <div className="mt-4">
            <Link href="/dashboard/students" className="text-sm text-blue-600 hover:text-blue-800">
              View All Students →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Teachers</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{schoolStats.teachers}</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600 text-xl">👨‍🏫</div>
          </div>
          <div className="mt-4">
            <Link href="/dashboard/teachers" className="text-sm text-purple-600 hover:text-purple-800">
              View All Teachers →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Classes</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{schoolStats.classes}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600 text-xl">🏫</div>
          </div>
          <div className="mt-4">
            <Link href="/dashboard/classes" className="text-sm text-yellow-600 hover:text-yellow-800">
              View All Classes →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Departments</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{schoolStats.departments}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg text-green-600 text-xl">🏢</div>
          </div>
          <div className="mt-4">
            <Link href="/dashboard/departments" className="text-sm text-green-600 hover:text-green-800">
              View Departments →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fee Collection Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Fee Collection</h2>
            <Link 
              href="/dashboard/fees" 
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Detailed Report
            </Link>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Collected</span>
              <span className="font-medium text-green-600">{formatCurrency(feeCollection.collected)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Pending</span>
              <span className="font-medium text-red-600">{formatCurrency(feeCollection.pending)}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t">
              <span className="text-gray-800 font-medium">Total</span>
              <span className="font-bold">{formatCurrency(feeCollection.total)}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${feeCollection.percentCollected}%` }}
              ></div>
            </div>
            <div className="text-right mt-1 text-sm text-gray-500">
              {feeCollection.percentCollected}% Collected
            </div>
          </div>
        </div>

        {/* Recent Admissions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Admissions</h2>
            <Link 
              href="/dashboard/admissions" 
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              View All
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentAdmissions.map(admission => (
              <div key={admission.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <h3 className="font-medium text-gray-800">{admission.name}</h3>
                  <div className="text-xs text-gray-500">{admission.class} • {new Date(admission.date).toLocaleDateString()}</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  admission.status === 'Completed' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {admission.status}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <Link 
              href="/dashboard/admissions/new" 
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 w-full"
            >
              + New Admission
            </Link>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Pending Requests</h2>
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">{pendingRequests.length} New</span>
          </div>
          
          <div className="space-y-3">
            {pendingRequests.map(request => (
              <div key={request.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md">
                {request.urgent && (
                  <div className="text-red-500 text-lg mt-1">⚠️</div>
                )}
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800">{request.type}</h3>
                  <div className="text-sm text-gray-600">From: {request.from}</div>
                  <div className="text-xs text-gray-500 mt-1">{new Date(request.date).toLocaleDateString()}</div>
                </div>
                <button className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md text-sm hover:bg-indigo-100">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Chart and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Student Attendance</h2>
            <select className="text-sm border rounded p-1">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {attendanceByMonth.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-grow">
                <div 
                  className="w-full bg-indigo-500 rounded-t-md" 
                  style={{ height: `${data.percentage * 0.6}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{data.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access Links */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Administrative Tools</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link 
              href="/dashboard/users/manage" 
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center space-x-3"
            >
              <div className="p-2 bg-indigo-100 rounded-md text-indigo-600">👤</div>
              <div>
                <h3 className="font-medium text-gray-800">Manage Users</h3>
                <p className="text-xs text-gray-500">Add or edit users</p>
              </div>
            </Link>
            
            <Link 
              href="/dashboard/settings" 
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center space-x-3"
            >
              <div className="p-2 bg-blue-100 rounded-md text-blue-600">⚙️</div>
              <div>
                <h3 className="font-medium text-gray-800">Settings</h3>
                <p className="text-xs text-gray-500">System configuration</p>
              </div>
            </Link>
            
            <Link 
              href="/dashboard/reports" 
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center space-x-3"
            >
              <div className="p-2 bg-green-100 rounded-md text-green-600">📊</div>
              <div>
                <h3 className="font-medium text-gray-800">Reports</h3>
                <p className="text-xs text-gray-500">Generate reports</p>
              </div>
            </Link>
            
            <Link 
              href="/dashboard/announcements" 
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center space-x-3"
            >
              <div className="p-2 bg-yellow-100 rounded-md text-yellow-600">📢</div>
              <div>
                <h3 className="font-medium text-gray-800">Announcements</h3>
                <p className="text-xs text-gray-500">Send notifications</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 