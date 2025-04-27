'use client';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { SchoolStaffRole_Enum } from './types/user';

interface DecodedToken {
  schoolId: string;
  email: string;
  role: SchoolStaffRole_Enum;
  iat: number;
  exp: number;
}

export const TOKEN_NAME = 'shiksha_auth_token';

// Set token in cookies
export const setAuthToken = (token: string) => {
  // Set cookie with 7 days expiry
  Cookies.set(TOKEN_NAME, token, {
    expires: 7, // 7 days
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });
};

// Get token from cookies
export const getAuthToken = (): string | undefined => {
  return Cookies.get(TOKEN_NAME);
};

// Remove token from cookies (logout)
export const removeAuthToken = () => {
  Cookies.remove(TOKEN_NAME, { path: '/' });
};

// Decode token and get user info
export const getUserFromToken = (): DecodedToken | null => {
  const token = getAuthToken();
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    
    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      removeAuthToken();
      return null;
    }
    
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    removeAuthToken();
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getUserFromToken() !== null;
};

// Get user role from token
export const getUserRole = (): string | null => {
  const user = getUserFromToken();
  return user ? user.role : null;
}; 