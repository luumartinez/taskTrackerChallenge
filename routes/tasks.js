/**
 * Rutas para el manejo de tareas
 */

const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');

/**
 * POST /api/tasks
 * Crea una nueva tarea
 */
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;

    // Validar el título
    const validation = taskService.validateTitle(title);
    
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Crear la tarea
    const task = await taskService.createTask(validation.trimmedTitle);

    // Responder con 201 y la tarea completa
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/tasks
 * Obtiene todas las tareas
 */
router.get('/', async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/tasks/:id
 * Obtiene una tarea por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error getting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PATCH /api/tasks/:id
 * Cambia el estado de completado de una tarea
 */
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.toggleTaskCompletion(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

