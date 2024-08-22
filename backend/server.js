const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');


const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173', // Update this if your frontend runs on a different port
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// Middleware
app.use(express.json());



// Routes
const usersRouter = require('./routes/users');
// const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');

app.use('/api/users', usersRouter);
// app.use('/api/projects', projectsRouter);
app.use('/api/tasks', authMiddleware, tasksRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes (we'll add these later)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});