'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { 
  loginSuperAdmin, 
  loginSchoolStaff, 
  loginStudent, 
  loginParent,
  logout as logoutService,
  SuperAdminLoginCredentials,
  SchoolUserLoginCredentials,
} from '@/services/auth';
import { getUserFromToken, isAuthenticated } from '@/utils/cookies';
import { SchoolStaffRole_Enum } from '@/utils/types/user';

interface AuthContextType {
  user: any | null;
  userRole: SchoolStaffRole_Enum | null;
  isLoading: boolean;
  error: string | null;
  loginAsSuperAdmin: (credentials: SuperAdminLoginCredentials) => Promise<void>;
  loginAsSchoolStaff: (credentials: SchoolUserLoginCredentials) => Promise<void>;
  loginAsStudent: (credentials: SchoolUserLoginCredentials) => Promise<void>;
  loginAsParent: (credentials: SchoolUserLoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<SchoolStaffRole_Enum | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check for existing auth when the provider mounts
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      console.log("Checking >>>>>>>>>>>>>>>>>>>> ")
      if (isAuthenticated()) {
        const userInfo = getUserFromToken();
        if (userInfo) {
          setUser(userInfo);
          setUserRole(userInfo.role);
        } else {
          setUser(null);
          setUserRole(null);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      setUserRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsSuperAdmin = async (credentials: SuperAdminLoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await loginSuperAdmin(credentials);
      if (result.success) {
        await checkAuth();
        router.push('/dashboard');
      }
    } catch (error: any) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsSchoolStaff = async (credentials: SchoolUserLoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await loginSchoolStaff(credentials);
      if (result.success) {
        await checkAuth();
        router.push('/dashboard');
      }
    } catch (error: any) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsStudent = async (credentials: SchoolUserLoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await loginStudent(credentials);
      if (result.success) {
        await checkAuth();
        router.push('/dashboard');
      }
    } catch (error: any) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsParent = async (credentials: SchoolUserLoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await loginParent(credentials);
      if (result.success) {
        await checkAuth();
        router.push('/dashboard');
      }
    } catch (error: any) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutService();
      setUser(null);
      setUserRole(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    userRole,
    isLoading,
    error,
    loginAsSuperAdmin,
    loginAsSchoolStaff,
    loginAsStudent,
    loginAsParent,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 