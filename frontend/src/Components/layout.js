// Layout.jsx
import React from 'react';
import SideBar from './sidebar';
import NavigationBar from './navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />

      {/* Right side: Top Navbar + Page Content */}
      <div className="flex-1 flex flex-col">
        <NavigationBar />
        <main className="p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default Layout;
