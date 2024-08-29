// backend/models/Agenda.js
const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  assignee: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Agenda', AgendaSchema);