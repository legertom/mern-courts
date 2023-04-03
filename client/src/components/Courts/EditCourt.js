import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCourt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surface, setSurface] = useState('');

  useEffect(() => {
    const fetchCourt = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/courts/${id}`);
        setName(response.data.name);
        setSurface(response.data.surface);
      } catch (error) {
        console.error('Error fetching court:', error);
      }
    };

    fetchCourt();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5005/courts/${id}`, { name, surface });
      navigate('/courts');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Edit Court</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surface"
          value={surface}
          onChange={(e) => setSurface(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditCourt;
