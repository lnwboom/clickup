// backend/routes/agenda.js
const express = require('express');
const router = express.Router();
const Agenda = require('../models/Agenda');
const authMiddleware = require('../middleware/authMiddleware');

// Get all agenda items for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const agendaItems = await Agenda.find({ user: req.user.id });
    res.json(agendaItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new agenda item
router.post('/', authMiddleware, async (req, res) => {
  const { date, description, time, assignee } = req.body;
  const agenda = new Agenda({
    date,
    description,
    time,
    assignee,
    user: req.user.id
  });

  try {
    const newAgenda = await agenda.save();
    res.status(201).json(newAgenda);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an agenda item
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedAgenda = await Agenda.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedAgenda) {
      return res.status(404).json({ message: 'Agenda item not found' });
    }
    res.json(updatedAgenda);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an agenda item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedAgenda = await Agenda.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deletedAgenda) {
      return res.status(404).json({ message: 'Agenda item not found' });
    }
    res.json({ message: 'Agenda item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;