const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: { type: String, required: true }, // Título obligatorio
    description: { type: String, required: true },
    completed: { type: Boolean, default: false }, // Por defecto no está terminada
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);