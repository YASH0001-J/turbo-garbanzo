'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

interface DashboardCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}

function MemberStats() {
  const [stats, setStats] = useState({ total: 0, active: 0, expired: 0 });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/members?stats=1');
        const json = await res.json();
        if (json?.success && mounted) setStats(json.data);
      } catch (err) {
        console.error('Failed to load member stats', err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const cards: DashboardCard[] = [
    { title: 'Total Members', value: stats.total.toString(), icon: '👥', color: 'bg-blue-50' },
    { title: 'Active Members', value: stats.active.toString(), icon: '✅', color: 'bg-green-50' },
    { title: 'Expired Memberships', value: stats.expired.toString(), icon: '⏰', color: 'bg-red-50' },
    { title: 'Total Trainers', value: '0', icon: '💪', color: 'bg-purple-50' },
    { title: 'Monthly Revenue', value: '₹0', icon: '💰', color: 'bg-yellow-50' },
    { title: 'Pending Payments', value: '₹0', icon: '⚠️', color: 'bg-orange-50' },
    { title: 'New Registrations', value: '0', icon: '🆕', color: 'bg-indigo-50' },
    { title: 'Attendance Today', value: '0', icon: '📍', color: 'bg-cyan-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {cards.map((card) => (
        <div key={card.title} className={`${card.color} rounded-lg p-6 shadow-sm border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
            </div>
            <div className="text-3xl">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const dashboardCards: DashboardCard[] = [
    { title: 'Total Members', value: '0', icon: '👥', color: 'bg-blue-50' },
    { title: 'Active Members', value: '0', icon: '✅', color: 'bg-green-50' },
    { title: 'Expired Memberships', value: '0', icon: '⏰', color: 'bg-red-50' },
    { title: 'Total Trainers', value: '0', icon: '💪', color: 'bg-purple-50' },
    { title: 'Monthly Revenue', value: '₹0', icon: '💰', color: 'bg-yellow-50' },
    { title: 'Pending Payments', value: '₹0', icon: '⚠️', color: 'bg-orange-50' },
    { title: 'New Registrations', value: '0', icon: '🆕', color: 'bg-indigo-50' },
    { title: 'Attendance Today', value: '0', icon: '📍', color: 'bg-cyan-50' },
  ];

  const features = [
    {
      category: 'Member Management',
      items: [
        { label: 'Add New Member', href: '/dashboard/members/add', icon: '➕' },
        { label: 'View All Members', href: '/dashboard/members', icon: '👥' },
        { label: 'Member Profiles', href: '/dashboard/members', icon: '📋' },
        { label: 'Search Members', href: '/dashboard/members', icon: '🔍' },
      ],
    },
    {
      category: 'Membership & Payments',
      items: [
        { label: 'Membership Plans', href: '/dashboard/memberships', icon: '📦' },
        { label: 'Payment History', href: '/dashboard/payments', icon: '💳' },
        { label: 'Pending Payments', href: '/dashboard/payments?status=pending', icon: '⏳' },
        { label: 'Generate Invoice', href: '/dashboard/invoices', icon: '📄' },
      ],
    },
    {
      category: 'Trainer Management',
      items: [
        { label: 'Add Trainer', href: '/dashboard/trainers/add', icon: '➕' },
        { label: 'All Trainers', href: '/dashboard/trainers', icon: '💪' },
        { label: 'Assign Members', href: '/dashboard/trainers', icon: '🔗' },
        { label: 'Trainer Reports', href: '/dashboard/reports/trainers', icon: '📊' },
      ],
    },
    {
      category: 'Attendance & Tracking',
      items: [
        { label: 'Daily Check-in', href: '/dashboard/attendance', icon: '📍' },
        { label: 'Attendance History', href: '/dashboard/attendance', icon: '📅' },
        { label: 'QR Code Scan', href: '/dashboard/attendance/qr', icon: '📱' },
        { label: 'Missed Attendance', href: '/dashboard/attendance?status=missed', icon: '❌' },
      ],
    },
    {
      category: 'Workout & Diet',
      items: [
        { label: 'Create Workout Plans', href: '/dashboard/workouts', icon: '🏋️' },
        { label: 'Diet Plans', href: '/dashboard/diets', icon: '🥗' },
        { label: 'Exercise Library', href: '/dashboard/exercises', icon: '📚' },
        { label: 'Assign Plans', href: '/dashboard/workouts', icon: '🔗' },
      ],
    },
    {
      category: 'Analytics & Reports',
      items: [
        { label: 'Revenue Reports', href: '/dashboard/reports/revenue', icon: '📈' },
        { label: 'Member Analytics', href: '/dashboard/reports/members', icon: '📊' },
        { label: 'Attendance Analytics', href: '/dashboard/reports/attendance', icon: '📉' },
        { label: 'Performance Metrics', href: '/dashboard/reports', icon: '🎯' },
      ],
    },
    {
      category: 'Notifications & Settings',
      items: [
        { label: 'Send Announcements', href: '/dashboard/notifications', icon: '📢' },
        { label: 'Payment Reminders', href: '/dashboard/notifications', icon: '🔔' },
        { label: 'Gym Settings', href: '/dashboard/settings', icon: '⚙️' },
        { label: 'Admin Profile', href: '/dashboard/settings/profile', icon: '👤' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ZYM Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Owner / Admin Control Panel</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <Button onClick={logout} variant="outline" className="ml-4">
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'features'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Features
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div>
            {/* Dashboard Cards */}
            <MemberStats />

            {/* Quick Stats Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Member Growth */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Growth</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="text-sm font-semibold text-green-600">+45 members</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>

              {/* Revenue Trend */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="text-sm font-semibold text-blue-600">₹5,82,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              {/* Attendance Rate */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Today</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Check-in Rate</span>
                    <span className="text-sm font-semibold text-purple-600">87.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">All Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((section) => (
                <div key={section.category} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.category}</h3>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition text-sm font-medium text-gray-700 hover:text-blue-600"
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
