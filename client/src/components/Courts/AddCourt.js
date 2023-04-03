import React, { useState } from "react";
import axios from "axios";

const AddCourt = () => {
    const [name, setName] = useState("");
    const [surface, setSurface] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const newCourt = { name, surface };
            const response = await axios.post('http://localhost:5005/courts/add', newCourt);
            console.log(response.data);
            setName('');
            setSurface('');
        } catch (error) {
            console.error(error);
            setError(error.response.data.message || "An error occured.");
        }
    }

    return (
        <div>
          <h2>Add Court</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Court Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Surface"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
            />
            <button type="submit">Add Court</button>
          </form>
        </div>
      );
    };
    
    export default AddCourt;