import React, { useState } from 'react';
import axios from 'axios';

const AddTruckForm = ({ onTruckAdded }) => {
  const [form, setForm] = useState({
    plate: '',
    model: '',
    status: 'Idle',
    lastServiceDate: '',
    driver: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const payload = {
      plate: form.plate,
      model: form.model,
      status: form.status,
      driver: form.driver,
    };

    if (form.lastServiceDate) {
      payload.lastServiceDate = new Date(form.lastServiceDate);
    }

    try {
      await axios.post('http://localhost:5000/api/trucks', payload);
      setMessage('✅ Truck added successfully!');
      setForm({
        plate: '',
        model: '',
        status: 'Idle',
        lastServiceDate: '',
        driver: '',
      });

      if (onTruckAdded) onTruckAdded();
    } catch (error) {
      console.error('🚨 Truck Add Error:', error.response?.data || error.message);
      setMessage(`❌ Failed to add truck: ${error.response?.data?.message || 'Invalid data'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Add New Truck</h2>

      <input
        type="text"
        name="plate"
        placeholder="Plate Number"
        value={form.plate}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="model"
        placeholder="Model"
        value={form.model}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="Idle">Idle</option>
        <option value="On Route">On Route</option>
        <option value="Maintenance">Maintenance</option>
      </select>

      <input
        type="date"
        name="lastServiceDate"
        value={form.lastServiceDate}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="driver"
        placeholder="Driver Name"
        value={form.driver}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Truck'}
      </button>

      {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
    </form>
  );
};

export default AddTruckForm;
