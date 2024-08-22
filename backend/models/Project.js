const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  color: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);