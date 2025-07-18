import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaTruck,
  FaPlus,
  FaUsers,
  FaWrench,
  FaChartBar,
  FaCog
} from 'react-icons/fa';
import './sidebar.css';

const SideBar = () => {
  return (
    <div className="sidebar-container w-[250px] bg-gray-800 min-h-screen p-4 text-white flex flex-col">

      {/* Logo */}
      <div className="logo mb-8">
        <Link to="/dashboard" className="text-2xl font-bold tracking-wide">
          Fleet<span className="text-orange-400">Core</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-links space-y-5" aria-label="Sidebar Navigation">
        <Link to="/dashboard" className="flex items-center gap-3 hover:text-blue-400">
          <FaTachometerAlt className="relative -top-1" />
          Dashboard
        </Link>
        <Link to="/dashboard/allTrucks" className="flex items-center gap-3 hover:text-blue-400">
          <FaTruck className="relative -top-1" />
          All Trucks
        </Link>
        <Link to="/dashboard/addTrucks" className="flex items-center gap-3 hover:text-blue-400">
          <FaPlus className="relative -top-1" />
          Add Trucks
        </Link>
        <Link to="/dashboard/drivers" className="flex items-center gap-3 hover:text-blue-400">
          <FaUsers className="relative -top-1" />
          Drivers
        </Link>
        <Link to="/dashboard/maintenance" className="flex items-center gap-3 hover:text-blue-400">
          <FaWrench className="relative -top-1" />
          Maintenance
        </Link>
        <Link to="/dashboard/reports" className="flex items-center gap-3 hover:text-blue-400">
          <FaChartBar className="relative -top-1" />
          Reports
        </Link>
      </nav>

      {/* Settings */}
      <div className="settings-link mt-auto pt-4 border-t border-gray-600">
        <Link to="/dashboard/settings" className="flex items-center gap-3 hover:text-blue-400">
          <FaCog className="relative -top-1" />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
