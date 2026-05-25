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
  token: string;
  user: User;
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

export function saveSession(auth: AuthData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', auth.token);
  localStorage.setItem('user', JSON.stringify(auth.user));
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
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
  return !!localStorage.getItem('token');
}

export const authAPI = {
  register: async (data: RegisterRequest): Promise<AuthData> => {
    const res = await api.post<ApiSuccessResponse<AuthData>>('/auth/register', data);
    return res.data.data;
  },

  login: async (data: LoginRequest): Promise<AuthData> => {
    const res = await api.post<ApiSuccessResponse<AuthData>>('/auth/login', data);
    return res.data.data;
  },

  getMe: () => api.get<ApiSuccessResponse<User>>('/auth/me'),

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } finally {
      clearSession();
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
