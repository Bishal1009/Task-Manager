const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a task by ID
router.get('/:id', getTask, (req, res) => {
  res.json(res.task);
});

// Create a new task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    history: [{ change: 'Task created' }]
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.put('/:id', getTask, async (req, res) => {
  if (req.body.title != null) {
    res.task.title = req.body.title;
    res.task.history.push({ change: 'Title updated' });
  }
  if (req.body.description != null) {
    res.task.description = req.body.description;
    res.task.history.push({ change: 'Description updated' });
  }
  if (req.body.dueDate != null) {
    res.task.dueDate = req.body.dueDate;
    res.task.history.push({ change: 'Due date updated' });
  }
  if (req.body.priority != null) {
    res.task.priority = req.body.priority;
    res.task.history.push({ change: 'Priority updated' });
  }
  if (req.body.status != null) {
    res.task.status = req.body.status;
    res.task.history.push({ change: `Status changed to ${req.body.status}` });
  }

  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:id', getTask, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Cannot find task' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.task = task;
  next();
}

module.exports = router;
