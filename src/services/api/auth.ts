import api from "@/utils/axios"

export class auth {
  static login = async (body: any) => {
    try {
      const response = await api.post("/auth/login", body)
      console.log("response is ", response)
      return response;
    } catch (err: any) {
      const message = err?.response?.data?.error || "Error while login"
      throw message
    }
  }
}


// import { BACKEND_URL } from '@/utils';
// import { setToken, removeToken } from '@/utils/nextCookies';
// import { SchoolStaffRole_Enum } from '@/utils/types/user';
// import axios from 'axios';


// export interface SuperAdminLoginCredentials {
//   email: string;
//   password: string;
// }

// export interface SchoolUserLoginCredentials {
//   schoolId: string;
//   email: string;
//   password: string;
// }

// // Simulate API calls
// export const loginSuperAdmin = async (credentials: SuperAdminLoginCredentials) => {
//   try {
//     // This would be an actual API call in production
//     const response = await axios.post(`${BACKEND_URL}/super-admin/login`, {
//       email: credentials.email,
//       password: credentials.password
//     })
//     const responseData = response.data
//     const token = responseData.data.token
//     await setToken(token);
//     return { success: true, role: SchoolStaffRole_Enum.SUPER_ADMIN };
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// };

// export const loginSchoolStaff = async (credentials: SchoolUserLoginCredentials) => {
//   try {
//     // This would be an actual API call in production
//     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

//     // Simulate validation
//     if (credentials.email === 'teacher@example.com' && credentials.password === 'password') {
//       // Simulate JWT token response
//       const token = 'mock_school_staff_token';
//       await setToken(token);
//       return { success: true, role: SchoolStaffRole_Enum.ADMIN };
//     }

//     throw new Error('Invalid credentials');
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// };

// export const loginStudent = async (credentials: SchoolUserLoginCredentials) => {
//   try {
//     // This would be an actual API call in production
//     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

//     // Simulate validation
//     if (credentials.email === 'student@example.com' && credentials.password === 'password') {
//       // Simulate JWT token response
//       const token = 'mock_student_token';
//      await setToken(token);
//       return { success: true, role: SchoolStaffRole_Enum.STUDENT };
//     }

//     throw new Error('Invalid credentials');
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// };

// export const loginParent = async (credentials: SchoolUserLoginCredentials) => {
//   try {
//     // This would be an actual API call in production
//     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

//     // Simulate validation
//     if (credentials.email === 'parent@example.com' && credentials.password === 'password') {
//       // Simulate JWT token response
//       const token = 'mock_parent_token';
//       await setToken(token);
//       return { success: true, role: SchoolStaffRole_Enum.PARENTS };
//     }

//     throw new Error('Invalid credentials');
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// };

// export const logout = async () => {
//   await removeToken();
//   // Clear any other auth-related state or storage
//   return { success: true };
// }; 