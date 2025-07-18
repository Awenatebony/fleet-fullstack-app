import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import RegistrationForm from './Components/register';
import LoginForm from './Components/login';
import Layout from './Components/layout';

import Dashboard from './pages/Dashboard';
import AllTrucks from './pages/AllTrucks';
import AddTrucks from './pages/AddTrucks';
import Maintenance from './pages/Maintenance';
import Report from './pages/Report';
import Drivers from './pages/Drivers';
import Settings from './pages/Settings'; // ✅ IMPORT THIS
import EditTruckForm from './pages/EditTruckForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect base route to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />

        {/* Dashboard Layout with Nested Routes */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="allTrucks" element={<AllTrucks />} />
          <Route path="addTrucks" element={<AddTrucks />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="reports" element={<Report />} />
          <Route path="settings" element={<Settings />} /> {/* ✅ This line is key */}
          <Route path='editform' element={<EditTruckForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;


