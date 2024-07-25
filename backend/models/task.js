const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  status: { type: String, enum: ['to-do', 'in-progress', 'completed'], default: 'to-do' },
  history: [{ date: { type: Date, default: Date.now }, change: { type: String } }]
});

module.exports = mongoose.model('Task', TaskSchema);
