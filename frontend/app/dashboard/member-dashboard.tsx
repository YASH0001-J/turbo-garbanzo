'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

export function MemberDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const memberStats = [
    { label: 'Membership Status', value: 'Active', icon: '✅', color: 'bg-green-50' },
    { label: 'Days Remaining', value: '45 days', icon: '⏳', color: 'bg-blue-50' },
    { label: 'Monthly Attendance', value: '18/30 days', icon: '📍', color: 'bg-purple-50' },
    { label: 'Current Streak', value: '7 days', icon: '🔥', color: 'bg-orange-50' },
  ];

  const menuItems = [
    {
      category: 'My Profile',
      items: [
        { label: 'View Profile', href: '/dashboard/profile', icon: '👤' },
        { label: 'Edit Profile', href: '/dashboard/profile/edit', icon: '✏️' },
        { label: 'Change Password', href: '/dashboard/settings/password', icon: '🔐' },
        { label: 'Upload Photo', href: '/dashboard/profile/photo', icon: '📸' },
      ],
    },
    {
      category: 'Membership',
      items: [
        { label: 'Membership Details', href: '/dashboard/membership', icon: '📋' },
        { label: 'Payment History', href: '/dashboard/payments', icon: '💳' },
        { label: 'Download Receipts', href: '/dashboard/payments/receipts', icon: '📄' },
        { label: 'Renew Membership', href: '/dashboard/membership/renew', icon: '🔄' },
      ],
    },
    {
      category: 'Workouts',
      items: [
        { label: 'My Workout Plan', href: '/dashboard/workouts', icon: '🏋️' },
        { label: 'Daily Exercises', href: '/dashboard/workouts/today', icon: '📋' },
        { label: 'Exercise Videos', href: '/dashboard/exercises', icon: '🎥' },
        { label: 'Mark Complete', href: '/dashboard/workouts/today', icon: '✅' },
      ],
    },
    {
      category: 'Diet & Nutrition',
      items: [
        { label: 'My Diet Plan', href: '/dashboard/diet', icon: '🥗' },
        { label: 'Meal Timing', href: '/dashboard/diet/meals', icon: '🍽️' },
        { label: 'Water Intake Tracker', href: '/dashboard/diet/water', icon: '💧' },
        { label: 'Calorie Counter', href: '/dashboard/diet/calories', icon: '⚖️' },
      ],
    },
    {
      category: 'Progress Tracking',
      items: [
        { label: 'Weight Progress', href: '/dashboard/progress/weight', icon: '📈' },
        { label: 'Body Measurements', href: '/dashboard/progress/measurements', icon: '📏' },
        { label: 'Progress Photos', href: '/dashboard/progress/photos', icon: '📸' },
        { label: 'Fitness Goals', href: '/dashboard/progress/goals', icon: '🎯' },
      ],
    },
    {
      category: 'Trainer',
      items: [
        { label: 'My Trainer', href: '/dashboard/trainer', icon: '💪' },
        { label: 'Message Trainer', href: '/dashboard/trainer/messages', icon: '💬' },
        { label: 'Schedule Sessions', href: '/dashboard/trainer/sessions', icon: '📅' },
        { label: 'View Feedback', href: '/dashboard/trainer/feedback', icon: '💭' },
      ],
    },
    {
      category: 'Attendance',
      items: [
        { label: 'Check-in', href: '/dashboard/attendance/checkin', icon: '📍' },
        { label: 'Attendance History', href: '/dashboard/attendance', icon: '📅' },
        { label: 'Monthly Report', href: '/dashboard/attendance/report', icon: '📊' },
        { label: 'View Streak', href: '/dashboard/attendance/streak', icon: '🔥' },
      ],
    },
    {
      category: 'Notifications',
      items: [
        { label: 'View Messages', href: '/dashboard/notifications', icon: '💬' },
        { label: 'Reminders', href: '/dashboard/notifications/reminders', icon: '🔔' },
        { label: 'Alerts', href: '/dashboard/notifications/alerts', icon: '⚠️' },
        { label: 'Notification Settings', href: '/dashboard/settings/notifications', icon: '⚙️' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ZYM Member Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Your Fitness Journey Starts Here</p>
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
              All Features
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {memberStats.map((stat) => (
                <div key={stat.label} className={`${stat.color} rounded-lg p-6 shadow-sm border border-gray-200`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className="text-3xl">{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Workout Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Today&apos;s Workout</h3>
                  <span className="text-2xl">🏋️</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Push Day - Upper Body</p>
                  <p className="text-xs text-gray-500">5 exercises • 60 minutes</p>
                  <Link href="/dashboard/workouts/today" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block">
                    View Exercises →
                  </Link>
                </div>
              </div>

              {/* Diet Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Today&apos;s Diet</h3>
                  <span className="text-2xl">🥗</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">High Protein Diet Plan</p>
                  <p className="text-xs text-gray-500">2100 calories • 180g protein</p>
                  <Link href="/dashboard/diet" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block">
                    View Meals →
                  </Link>
                </div>
              </div>

              {/* Trainer Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Your Trainer</h3>
                  <span className="text-2xl">💪</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">John Smith</p>
                  <p className="text-xs text-gray-500">Available • Next session tomorrow</p>
                  <Link href="/dashboard/trainer" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block">
                    Contact Trainer →
                  </Link>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
                  <span className="text-2xl">📈</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Weight Loss</span>
                      <span>5 kg lost</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <Link href="/dashboard/progress/weight" className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-block mt-2">
                    View Details →
                  </Link>
                </div>
              </div>

              {/* Membership Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Membership</h3>
                  <span className="text-2xl">📋</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Premium Membership</p>
                  <p className="text-xs text-gray-500">Expires in 45 days</p>
                  <Link href="/dashboard/membership/renew" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block">
                    Renew Now →
                  </Link>
                </div>
              </div>

              {/* Attendance Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Attendance</h3>
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">7 Day Streak</p>
                  <p className="text-xs text-gray-500">18 out of 30 days this month</p>
                  <Link href="/dashboard/attendance" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block">
                    View History →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">All Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((section) => (
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
