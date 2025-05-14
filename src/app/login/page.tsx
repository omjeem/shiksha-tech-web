'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/Common/Card';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import Select from '@/components/Common/Select';
import Tabs from '@/components/Common/Tabs';
import { SchoolStaffRole_Enum } from '@/utils/types/user';
import apiServices from '@/services';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
// import { useAuth } from '@/contexts/AuthContext';


interface FormDataInterface {
  email: string;
  password: string;
  schoolId: string;
  role: SchoolStaffRole_Enum;
}

interface SchoolList {
  id: string;
  name: string
}

export default function LoginPage() {

  const [formData, setFormData] = useState<FormDataInterface>({
    email: "",
    password: "",
    schoolId: "",
    role: SchoolStaffRole_Enum.SUPER_ADMIN
  })
  const [activeTab, setActiveTab] = useState(SchoolStaffRole_Enum.SUPER_ADMIN);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [schoolList, setSchoolList] = useState<SchoolList[]>([])
  const router = useRouter()

  const handelFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      setError("")
      const response = await apiServices.auth.login(formData)
      const responseData = response.data
      console.log("Toast is ", toast)
      toast.success(responseData.message)
      console.log(responseData)
      router.push("/admin/dashboard")
    } catch (err: any) {
      console.log("Error in login ", err)
      setError(String(err))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setFormData({ email: "", password: "", schoolId: "", role: activeTab })
  }, [activeTab])

  useEffect(() => {
    const fetchSchoolList = async () => {
      const response = await apiServices.school.getSchoolList()
      const select = {
        id: "",
        name: "Select School"
      }
      const schoolData = [select, ...response]
      setSchoolList(schoolData)
    }
    fetchSchoolList()
  }, [])


  const getDemoCredentials = (userType: string) => {
    switch (userType) {
      case 'super-admin':
        return 'Demo: admin@example.com / password';
      case 'school-staff':
        return 'Demo: teacher@example.com / password';
      case 'student':
        return 'Demo: student@example.com / password';
      case 'parent':
        return 'Demo: parent@example.com / password';
      default:
        return '';
    }
  };

  const tabs = [
    {
      id: SchoolStaffRole_Enum.SUPER_ADMIN,
      label: 'Super Admin',
      content: (
        <form onSubmit={handelFormSubmit} className="space-y-6">
          <Input
            id="super-admin-email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value, role: SchoolStaffRole_Enum.SUPER_ADMIN })}
            required
            helperText={getDemoCredentials('super-admin')}
            icon={
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            }
          />
          <Input
            id="super-admin-password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value, role: SchoolStaffRole_Enum.SUPER_ADMIN })}
            required
            icon={
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            }
          />
          <div>
            <Button type="submit" fullWidth isLoading={isLoading}>
              Sign In
            </Button>
          </div>
        </form>
      ),
    },
    {
      id: SchoolStaffRole_Enum.TEACHER,
      label: 'School Staff',
      content: (
        <form onSubmit={handelFormSubmit} className="space-y-6">
          <Select
            id="school-staff-school"
            label="School"
            options={schoolList}
            value={formData.schoolId}
            onChange={(value) => setFormData({ ...formData, schoolId: value })}
            required
          />
          <Input
            id="school-staff-email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            helperText={getDemoCredentials('school-staff')}
            icon={
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            }
          />
          <Input
            id="school-staff-password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            icon={
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            }
          />
          <div>
            <Button type="submit" fullWidth isLoading={isLoading}>
              Sign In
            </Button>
          </div>
        </form>
      ),
    },
    {
      id: SchoolStaffRole_Enum.STUDENT,
      label: 'Student',
      content: (
        <form onSubmit={handelFormSubmit} className="space-y-6">
          <Select
            id="student-school"
            label="School"
            options={schoolList}
            value={formData.schoolId}
            onChange={(value) => setFormData({ ...formData, schoolId: value })}
            required
          />
          <Input
            id="student-email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            helperText={getDemoCredentials('student')}
            icon={
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            }
          />
          <Input
            id="student-password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            icon={
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            }
          />
          <div>
            <Button type="submit" fullWidth isLoading={isLoading}>
              Sign In
            </Button>
          </div>
        </form>
      ),
    },
    {
      id: SchoolStaffRole_Enum.PARENTS,
      label: 'Parent',
      content: (
        <form onSubmit={handelFormSubmit} className="space-y-6">
          <Select
            id="parent-school"
            label="School"
            options={schoolList}
            value={formData.schoolId}
            onChange={(value) => setFormData({ ...formData, schoolId: value })}
            required
          />
          <Input
            id="parent-email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            helperText={getDemoCredentials('parent')}
            icon={
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            }
          />
          <Input
            id="parent-password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            icon={
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            }
          />
          <div>
            <Button type="submit" fullWidth isLoading={isLoading}>
              Sign In
            </Button>
          </div>
        </form>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-20 h-20 relative">
            {/* Replace with your actual logo */}
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              ST
            </div>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to Shiksha Tech
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          School Management Made Simple
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
              <button
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => { setError("") }}
              >
                <span className="sr-only">Close</span>
                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </button>
            </div>
          )}

          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className='' />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Need help?</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/contact" className="text-sm text-indigo-600 hover:text-indigo-500">
                Contact support
              </Link>
            </div>
          </div>
        </Card>

        <p className="mt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Shiksha Tech. All rights reserved.
        </p>
      </div>
    </div>
  );
}