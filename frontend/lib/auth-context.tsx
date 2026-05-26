'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { authAPI, getStoredUser, User, clearSession } from './auth-service';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const initDone = useRef(false);

  const refetchUser = async () => {
    try {
      const response = await authAPI.getMe();
      setUser(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
      clearSession();
      throw error;
    }
  };

  useEffect(() => {
    // Only run initialization once
    if (initDone.current) return;
    initDone.current = true;

    // Load user from localStorage immediately, don't wait for backend
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);

    // Verify token with backend in background (non-blocking)
    if (storedUser) {
      refetchUser().catch((err) => {
        console.error('Silent token verification failed:', err);
        // Don't clear user on verification failure, let user try to refresh
      });
    }
  }, []);

  const logout = async () => {
    try {
      await authAPI.logout();
    } finally {
      clearSession();
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
