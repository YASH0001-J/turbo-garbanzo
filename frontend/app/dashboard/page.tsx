'use client';

import { withProtectedRoute } from '@/lib/protected-route';
import { useAuth } from '@/lib/auth-context';
import { AdminDashboard } from './admin-dashboard';
import { TrainerDashboard } from './trainer-dashboard';
import { MemberDashboard } from './member-dashboard';

function DashboardPage() {
  const { user } = useAuth();

  // User is guaranteed to exist here due to withProtectedRoute
  if (!user) {
    return null;
  }

  // Render dashboard based on user role
  switch (user.role) {
    case 'super_admin':
    case 'gym_owner':
      return <AdminDashboard />;
    case 'trainer':
      return <TrainerDashboard />;
    case 'member':
    default:
      return <MemberDashboard />;
  }
}

export default withProtectedRoute(DashboardPage);
