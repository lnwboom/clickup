const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');


// GET all tasks from User
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific task
router.get('/:id', getTask, (req, res) => {
  res.json(res.task);
});

// POST a new task
router.post('/tasks', authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;
    const newTask = new Task({
      title,
      description,
      dueDate,
      status,
      priority,
      user: req.user._id // This comes from the authMiddleware
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
});

// UPDATE a task
router.patch('/:id', authMiddleware, getTask, async (req, res) => {
  if (req.body.title != null) {
    res.task.title = req.body.title;
  }
  if (req.body.description != null) {
    res.task.description = req.body.description;
  }
  if (req.body.status != null) {
    res.task.status = req.body.status;
  }
  if (req.body.priority != null) {
    res.task.priority = req.body.priority;
  }
  if (req.body.dueDate != null) {
    res.task.dueDate = req.body.dueDate;
  }
  if (req.body.projectId != null) {
    res.task.project = req.body.projectId;
  }
  if (req.body.parentTaskId != null) {
    res.task.parentTask = req.body.parentTaskId;
  }

  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a task
router.delete('/:id', authMiddleware, getTask, async (req, res) => {
  try {
    await Task.deleteOne({ _id: res.task._id });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // GET tasks by project
// router.get('/project/:projectId', async (req, res) => {
//   try {
//     const tasks = await Task.find({ project: req.params.projectId }).populate('user', 'username');
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// GET tasks by user
router.get('/user/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.userId }).populate('project', 'name');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET subtasks of a task
router.get('/:id/subtasks', getTask, async (req, res) => {
  try {
    const subtasks = await Task.find({ parentTask: res.task._id });
    res.json(subtasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a task by ID
async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Add this check
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this task' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.task = task;
  next();
}

module.exports = router;