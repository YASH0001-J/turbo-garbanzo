'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

export function TrainerDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const trainerStats = [
    { label: 'Assigned Members', value: '28', icon: '👥', color: 'bg-blue-50' },
    { label: "Today's Sessions", value: '6', icon: '📅', color: 'bg-green-50' },
    { label: 'Active Members', value: '24', icon: '✅', color: 'bg-purple-50' },
    { label: 'Total Experience', value: '8 Years', icon: '⭐', color: 'bg-yellow-50' },
  ];

  const features = [
    {
      category: 'Members',
      items: [
        { label: 'View All Members', href: '/dashboard/trainer/members', icon: '👥' },
        { label: 'Member Profiles', href: '/dashboard/trainer/members', icon: '📋' },
        { label: 'Track Progress', href: '/dashboard/trainer/progress', icon: '📈' },
        { label: 'Assign Plans', href: '/dashboard/trainer/members', icon: '🔗' },
      ],
    },
    {
      category: 'Workouts',
      items: [
        { label: 'Create Workout Plans', href: '/dashboard/trainer/workouts', icon: '🏋️' },
        { label: 'Assign Exercises', href: '/dashboard/trainer/workouts', icon: '📝' },
        { label: 'Exercise Library', href: '/dashboard/trainer/exercises', icon: '📚' },
        { label: 'Upload Videos', href: '/dashboard/trainer/workouts/videos', icon: '🎥' },
      ],
    },
    {
      category: 'Attendance',
      items: [
        { label: 'Mark Attendance', href: '/dashboard/trainer/attendance', icon: '📍' },
        { label: 'Attendance Reports', href: '/dashboard/trainer/attendance', icon: '📊' },
        { label: 'Member Consistency', href: '/dashboard/trainer/attendance', icon: '📉' },
        { label: 'View History', href: '/dashboard/trainer/attendance', icon: '📅' },
      ],
    },
    {
      category: 'Progress Tracking',
      items: [
        { label: 'Weight Tracking', href: '/dashboard/trainer/progress', icon: '⚖️' },
        { label: 'BMI Updates', href: '/dashboard/trainer/progress', icon: '📏' },
        { label: 'Body Measurements', href: '/dashboard/trainer/progress', icon: '📐' },
        { label: 'Progress Photos', href: '/dashboard/trainer/progress', icon: '📸' },
      ],
    },
    {
      category: 'Communication',
      items: [
        { label: 'Message Members', href: '/dashboard/trainer/messages', icon: '💬' },
        { label: 'Send Reminders', href: '/dashboard/trainer/messages', icon: '🔔' },
        { label: 'Workout Updates', href: '/dashboard/trainer/messages', icon: '📢' },
        { label: 'Session Feedback', href: '/dashboard/trainer/feedback', icon: '💭' },
      ],
    },
    {
      category: 'Schedule',
      items: [
        { label: 'My Sessions', href: '/dashboard/trainer/schedule', icon: '📅' },
        { label: 'Member Bookings', href: '/dashboard/trainer/bookings', icon: '🗓️' },
        { label: 'Time Availability', href: '/dashboard/trainer/availability', icon: '⏰' },
        { label: 'Session Reports', href: '/dashboard/trainer/sessions', icon: '📊' },
      ],
    },
    {
      category: 'Reports & Analytics',
      items: [
        { label: 'Performance Report', href: '/dashboard/trainer/reports', icon: '📈' },
        { label: 'Member Statistics', href: '/dashboard/trainer/reports', icon: '📊' },
        { label: 'Progress Analytics', href: '/dashboard/trainer/reports', icon: '📉' },
        { label: 'Session History', href: '/dashboard/trainer/reports', icon: '📋' },
      ],
    },
    {
      category: 'Settings',
      items: [
        { label: 'Edit Profile', href: '/dashboard/trainer/profile', icon: '👤' },
        { label: 'Specializations', href: '/dashboard/trainer/specializations', icon: '⭐' },
        { label: 'Certification', href: '/dashboard/trainer/certification', icon: '🎓' },
        { label: 'Change Password', href: '/dashboard/settings/password', icon: '🔐' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ZYM Trainer Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage Your Members & Sessions</p>
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
              {trainerStats.map((stat) => (
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
              {/* Today's Sessions */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  📅 Today's Sessions
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-gray-900">John Doe - 09:00 AM</p>
                    <p className="text-xs text-gray-600">Upper Body Strength</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm font-medium text-gray-900">Sarah Smith - 10:30 AM</p>
                    <p className="text-xs text-gray-600">Weight Loss Program</p>
                  </div>
                  <Link href="/dashboard/trainer/schedule" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block">
                    View All Sessions →
                  </Link>
                </div>
              </div>

              {/* Top Performing Members */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🌟 Top Members
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm text-gray-700">Rajesh Kumar</span>
                    <span className="text-xs font-semibold text-green-600">⭐⭐⭐⭐⭐</span>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm text-gray-700">Priya Sharma</span>
                    <span className="text-xs font-semibold text-green-600">⭐⭐⭐⭐</span>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm text-gray-700">Amit Singh</span>
                    <span className="text-xs font-semibold text-green-600">⭐⭐⭐⭐</span>
                  </div>
                  <Link href="/dashboard/trainer/members" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block">
                    View All Members →
                  </Link>
                </div>
              </div>

              {/* Member Progress */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  📈 Member Progress
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Strength Improvement</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Weight Loss</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <Link href="/dashboard/trainer/progress" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block">
                    View Details →
                  </Link>
                </div>
              </div>

              {/* Attendance Summary */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  📍 Attendance Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2">
                    <span className="text-sm text-gray-700">Members Present Today</span>
                    <span className="text-lg font-bold text-green-600">22/28</span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span className="text-sm text-gray-700">Absent</span>
                    <span className="text-lg font-bold text-red-600">6</span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span className="text-sm text-gray-700">Avg Attendance</span>
                    <span className="text-lg font-bold text-blue-600">87%</span>
                  </div>
                  <Link href="/dashboard/trainer/attendance" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block">
                    View Report →
                  </Link>
                </div>
              </div>

              {/* Messages */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  💬 Messages
                </h3>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Recent messages from members</p>
                  <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-500">
                    <p className="text-xs font-medium text-gray-900">John: Can you review my form?</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-500">
                    <p className="text-xs font-medium text-gray-900">Sarah: Workout plan looks great!</p>
                  </div>
                  <Link href="/dashboard/trainer/messages" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block">
                    View All →
                  </Link>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🎯 Quick Stats
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2">
                    <span className="text-sm text-gray-700">Workouts Created</span>
                    <span className="text-lg font-bold text-purple-600">15</span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span className="text-sm text-gray-700">Plans Assigned</span>
                    <span className="text-lg font-bold text-purple-600">28</span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span className="text-sm text-gray-700">Videos Uploaded</span>
                    <span className="text-lg font-bold text-purple-600">45</span>
                  </div>
                  <Link href="/dashboard/trainer/reports" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block">
                    View Reports →
                  </Link>
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
