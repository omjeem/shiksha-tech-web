import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  iat: number;
  exp: number;
}

export const TOKEN_NAME = 'shiksha_auth_token';

// Set token in cookies
export const setAuthToken = (token: string) => {
  const cookieStore = cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
    sameSite: 'strict',
  });
};

// Get token from cookies
export const getAuthToken = (): string | undefined => {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  return token;
};

// Remove token from cookies (logout)
export const removeAuthToken = () => {
  const cookieStore = cookies();
  cookieStore.delete(TOKEN_NAME);
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