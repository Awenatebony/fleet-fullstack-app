import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/trucks/summary/data', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // if you're storing JWT
          },
        });
        setSummary(res.data);
      } catch (err) {
        console.error('Failed to load dashboard summary:', err.message);
      }
    };

    fetchSummary();
  }, []);

  if (!summary) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-6 rounded shadow text-blue-900">
        <h2 className="text-2xl font-bold">Welcome back!</h2>
        <p className="text-md mt-1">Here’s a quick look at your fleet performance.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Trucks" value={summary.totalTrucks} />
        <StatCard label="Active Trucks" value={summary.activeTrucks} />
        <StatCard label="Maintenance" value={summary.underMaintenance} />
        <StatCard label="Inactive Trucks" value={summary.inactiveTrucks} />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white shadow p-4 rounded text-center">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
