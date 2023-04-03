const router = require('express').Router();
const Court = require('../models/court.model');

// Get all courts
router.get('/', async (req, res) => {
  try {
    const courts = await Court.find();
    res.json(courts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a court
router.post('/add', async (req, res) => {
  const newCourt = new Court(req.body);

  try {
    const savedCourt = await newCourt.save();
    res.status(201).json(savedCourt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific court
router.get('/:id', async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (court) {
      res.json(court);
    } else {
      res.status(404).json({ message: 'Court not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a court
router.put('/:id', async (req, res) => {
  try {
    const updatedCourt = await Court.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedCourt) {
      res.json(updatedCourt);
    } else {
      res.status(404).json({ message: 'Court not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a court
router.delete('/:id', async (req, res) => {
  try {
    const court = await Court.findByIdAndDelete(req.params.id);
    if (court) {
      res.json({ message: 'Court deleted' });
    } else {
      res.status(404).json({ message: 'Court not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
