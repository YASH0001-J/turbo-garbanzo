import axios from 'axios';
import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export type UserRole = 'super_admin' | 'gym_owner' | 'trainer' | 'member';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthData {
  user: User;
  token?: string;
}

interface ApiSuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Cannot reach the server. Check your connection and try again.';
    }
    const message = error.response?.data?.message;
    if (typeof message === 'string') return message;
    return error.message || 'Something went wrong';
  }
  if (error instanceof Error) return error.message;
  return 'Something went wrong';
}

export function saveUserSession(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user', JSON.stringify(user));
}

export function saveAuthToken(token: string | undefined): void {
  if (typeof window === 'undefined') return;
  if (token) localStorage.setItem('token', token);
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('user');
}

export function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!getStoredUser();
}

export const authAPI = {
  register: async (data: RegisterRequest): Promise<AuthData> => {
    const res = await api.post<ApiSuccessResponse<AuthData>>('/auth/register', data);
    const payload = res.data.data;
    saveUserSession(payload.user);
    saveAuthToken(payload.token);
    return payload;
  },

  login: async (data: LoginRequest): Promise<AuthData> => {
    const res = await api.post<ApiSuccessResponse<AuthData>>('/auth/login', data);
    const payload = res.data.data;
    saveUserSession(payload.user);
    saveAuthToken(payload.token);
    return payload;
  },

  getMe: () => api.get<ApiSuccessResponse<User>>('/auth/me'),

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } finally {
      clearSession();
      clearAuthToken();
    }
  },
};

export const gymAPI = {
  getAll: () => api.get('/gyms'),
  getOwnerGym: () => api.get('/gyms/owner/my-gym'),
  getById: (id: number) => api.get(`/gyms/${id}`),
  create: (data: Record<string, unknown>) => api.post('/gyms', data),
  update: (id: number, data: Record<string, unknown>) => api.put(`/gyms/${id}`, data),
  delete: (id: number) => api.delete(`/gyms/${id}`),
};
