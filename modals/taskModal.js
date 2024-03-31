const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    priority: { type: String, enum: ['low', 'medium', 'high'], default: ["medium"] },
    category: String
});

const TaskModal = mongoose.model('Tasks', taskSchema);

module.exports = { TaskModal }