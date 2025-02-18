import React from 'react';
import { useProfile } from '../hooks/useProfile';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { profile, loading } = useProfile();

  if (loading) return <LoadingSpinner />;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <section className="mb-8">
        <h1 className="text-2xl font-bold mb-4">
          Welcome back, {profile?.first_name || 'Coach'}!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-2">Upcoming Sessions</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-gray-600">Scheduled sessions</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-2">Profile Views</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-gray-600">Last 30 days</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-2">Availability</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-gray-600">Open time slots</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="card p-6 text-left hover:shadow-md transition-shadow">
            <i className="fas fa-calendar-alt text-primary text-2xl mb-2"></i>
            <h3 className="font-semibold mb-1">Update Availability</h3>
            <p className="text-sm text-gray-600">Set your coaching schedule</p>
          </button>
          <button className="card p-6 text-left hover:shadow-md transition-shadow">
            <i className="fas fa-user-edit text-primary text-2xl mb-2"></i>
            <h3 className="font-semibold mb-1">Edit Profile</h3>
            <p className="text-sm text-gray-600">Update your coaching information</p>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
