const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'pending' },
  priority: { type: Number, default: 1 },
  dueDate: Date,
 // project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 // parentTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);