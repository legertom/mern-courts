import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DeleteCourtButton from './DeleteCourtButton';
import { AuthContext } from '../../context/AuthContext';

const CourtList = () => {

  const [courts, setCourts] = useState([]);
   const [authChecked, setAuthChecked] = useState(false); 

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

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    if (!isAuthenticated && authChecked) {
      navigate('/login');
    } else {
      setAuthChecked(true);
    }
  }, [isAuthenticated, navigate, authChecked]);

  return (
    <div>
      <h2>Courts</h2>
      <ul>
        {courts.map((court) => (
          <li key={court._id}>
            <p><span className="court-name">{court.name} </span>
            ({court.surface})
            <Link to={`/courts/edit/${court._id}`}>Edit</Link>
            <DeleteCourtButton courtId={court._id} onDelete={handleDelete} /></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourtList;
