import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import profileImage from '../images/elephant.jpeg';

const NavigationBar = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="w-full bg-white px-6 py-4 flex items-center justify-between shadow-md">

      {/* Left side: Search input */}
      <section className="flex-1">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search here..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </section>

      {/* Right side: Notification + Profile */}
      <section className="flex items-center gap-6 ml-6">
        {/* Notification icon */}
        <button className="text-gray-600 hover:text-blue-500 text-xl relative">
          <FaBell />
          {/* Optional: badge dot */}
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User profile image */}
        <img
          src={profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border"
        />
      </section>

    </div>
  );
};

export default NavigationBar;
