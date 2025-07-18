import React, { useState } from 'react';
import axios from 'axios';

const EditTruckForm = ({ truck, onDone }) => {
  const [form, setForm] = useState({ ...truck });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/trucks/${truck._id}`, form);
      onDone(); // Refresh list
    } catch (error) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow space-y-3">
      <h2 className="font-semibold">Edit Truck</h2>

      <input name="plate" value={form.plate} onChange={handleChange} className="w-full border p-2 rounded" required />
      <input name="model" value={form.model} onChange={handleChange} className="w-full border p-2 rounded" />
      <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="Idle">Idle</option>
        <option value="On Route">On Route</option>
        <option value="Maintenance">Maintenance</option>
      </select>
      <input name="driver" value={form.driver} onChange={handleChange} className="w-full border p-2 rounded" />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Updating...' : 'Update'}
      </button>
    </form>
  );
};

export default EditTruckForm;
