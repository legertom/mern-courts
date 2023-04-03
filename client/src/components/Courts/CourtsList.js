import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteCourtButton from './DeleteCourtButton';

const CourtList = () => {
  const [courts, setCourts] = useState([]);

  const handleDelete = (courtId) => {
    setCourts(courts.filter((court) => court._id !== courtId));
  };


  useEffect(() => {
    async function fetchCourts() {
      try {
        const response = await axios.get('http://localhost:5005/courts');
        setCourts(response.data);
      } catch (error) {
        console.error('Error fetching courts:', error);
      }
    }

    fetchCourts();
  }, []);

  return (
    <div>
      <h2>Courts</h2>
      <ul>
        {courts.map((court) => (
          <li key={court._id}>
            <h3>{court.name}</h3>
            <p>{court.surface}</p>
            <Link to={`/courts/edit/${court._id}`}>Edit</Link>
            <DeleteCourtButton courtId={court._id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourtList;
