const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// 1. OBTENER todas las tareas (GET)
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find(); // Busca todo en la BD
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. CREAR una tarea nueva (POST)
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    
    try {
        const savedTask = await newTask.save(); // Guarda en la BD
        res.json({ status: 'Tarea Guardada', task: savedTask });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 3. ELIMINAR una tarea (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ status: 'Tarea Eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Actualizar una tarea (PUT)
router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTask = { title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({ status: 'Tarea Actualizada' });
});

module.exports = router;