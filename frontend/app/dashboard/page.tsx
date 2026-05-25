'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import {
  authAPI,
  clearSession,
  getStoredUser,
  isAuthenticated,
  type User,
} from '@/lib/auth-service';

const roleLabels: Record<string, string> = {
  super_admin: 'Super Admin',
  gym_owner: 'Gym Owner',
  trainer: 'Trainer',
  member: 'Member',
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
      return;
    }

    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
      setIsLoading(false);
      return;
    }

    authAPI
      .getMe()
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {
        clearSession();
        router.replace('/login');
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authAPI.logout();
      toast.success('Logged out successfully');
      router.push('/login');
    } catch {
      clearSession();
      router.push('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
          ZYM
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden sm:inline">
            {user.name}
          </span>
          <Button variant="outline" onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user.name}!
          </h1>
          <p className="text-gray-600 mb-8">
            You are signed in to your ZYM Dashboard account.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-500 mb-1">Role</p>
              <p className="font-medium text-gray-900">
                {roleLabels[user.role] || user.role}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-500 mb-1">User ID</p>
              <p className="font-medium text-gray-900">{user.id}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-600 mb-1">Status</p>
              <p className="font-medium text-blue-900">Active session</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
