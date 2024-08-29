// backend/routes/projects.js
const express = require('express');
const router = express.Router();
const Workspace = require('../models/Workspace');
const authMiddleware = require('../middleware/authMiddleware');

// // Get all projects for the authenticated user
// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const projects = await Project.find({ $or: [{ owner: req.user.id }, { members: req.user.id }] });
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create a new project
// router.post('/', authMiddleware, async (req, res) => {
//   const project = new Project({
//     ...req.body,
//     owner: req.user.id
//   });

//   try {
//     const newProject = await project.save();
//     res.status(201).json(newProject);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Add more routes for updating, deleting projects, and managing members
// GET all workspaces for the user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const workspaces = await Workspace.find({ $or: [{ owner: req.user._id }, { members: req.user._id }] });
    res.json(workspaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new workspace
router.post('/', authMiddleware, async (req, res) => {
  const workspace = new Workspace({
    ...req.body,
    owner: req.user._id
  });

  try {
    const newWorkspace = await workspace.save();
    res.status(201).json(newWorkspace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a specific workspace
router.get('/:id', authMiddleware, getWorkspace, (req, res) => {
  res.json(res.workspace);
});

// UPDATE a workspace
router.patch('/:id', authMiddleware, getWorkspace, async (req, res) => {
  if (req.body.name != null) {
    res.workspace.name = req.body.name;
  }
  if (req.body.description != null) {
    res.workspace.description = req.body.description;
  }
  if (req.body.members != null) {
    res.workspace.members = req.body.members;
  }

  try {
    const updatedWorkspace = await res.workspace.save();
    res.json(updatedWorkspace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a workspace
router.delete('/:id', authMiddleware, getWorkspace, async (req, res) => {
  try {
    await res.workspace.remove();
    res.json({ message: 'Workspace deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id/favorite', authMiddleware, getWorkspace, async (req, res) => {
  try {
    res.workspace.isFavorite = !res.workspace.isFavorite;
    const updatedWorkspace = await res.workspace.save();
    res.json(updatedWorkspace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Middleware function to get a workspace by ID
async function getWorkspace(req, res, next) {
  let workspace;
  try {
    workspace = await Workspace.findById(req.params.id);
    if (workspace == null) {
      return res.status(404).json({ message: 'Workspace not found' });
    }
    
    // Check if the user is the owner or a member of the workspace
    if (workspace.owner.toString() !== req.user._id.toString() && !workspace.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to access this workspace' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.workspace = workspace;
  next();
}

module.exports = router;