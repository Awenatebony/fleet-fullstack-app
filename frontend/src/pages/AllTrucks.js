import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditTruckForm from './EditTruckForm';

const TruckList = ({ onEdit }) => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/trucks');
        setTrucks(res.data);
      } catch (error) {
        setMessage('❌ Failed to load trucks');
      } finally {
        setLoading(false);
      }
    };

    fetchTrucks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this truck?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/trucks/${id}`);
      setTrucks(trucks.filter(truck => truck._id !== id));
    } catch (error) {
      alert("Failed to delete");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">All Trucks</h2>
      {message && <p>{message}</p>}
      {trucks.map(truck => (
        <div key={truck._id} className="border p-4 rounded shadow flex justify-between items-center">
          <div>
            <p><strong>Plate:</strong> {truck.plate}</p>
            <p><strong>Model:</strong> {truck.model}</p>
            <p><strong>Status:</strong> {truck.status}</p>
            <p><strong>Driver:</strong> {truck.driver}</p>
          </div>
          <div className="space-x-2">
            <button onClick={() => onEdit(<EditTruckForm/>)} className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
            <button onClick={() => handleDelete(truck._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TruckList;
