import React from 'react';
import axios from 'axios';

const DeleteCourtButton = ({ courtId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5005/courts/${courtId}`);
      onDelete(courtId);
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteCourtButton;

