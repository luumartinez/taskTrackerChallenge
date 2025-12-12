/**
 * Servicio de lógica de negocio para tareas
 * Usa MongoDB a través de Mongoose
 */

const Task = require('../models/Task');

/**
 * Valida el título de una tarea
 * @param {string} title - Título a validar
 * @returns {Object} - { valid: boolean, error?: string }
 */
function validateTitle(title) {
  // Validación: title requerido
  if (title === undefined || title === null) {
    return { valid: false, error: 'Title is required' };
  }

  // Convertir a string si no lo es
  if (typeof title !== 'string') {
    return { valid: false, error: 'Title must be a string' };
  }

  // Validación: trim (eliminar espacios al inicio y final)
  const trimmedTitle = title.trim();

  // Validación: title requerido (después del trim)
  if (trimmedTitle === '') {
    return { valid: false, error: 'Title is required' };
  }

  // Validación: longitud entre 3 y 80 caracteres
  if (trimmedTitle.length < 3) {
    return { valid: false, error: 'Title must be at least 3 characters long' };
  }

  if (trimmedTitle.length > 80) {
    return { valid: false, error: 'Title must be at most 80 characters long' };
  }

  return { valid: true, trimmedTitle };
}

/**
 * Crea una nueva tarea con valores por defecto
 * @param {string} title - Título de la tarea (ya validado)
 * @returns {Promise<Object>} - Tarea creada
 */
async function createTask(title) {
  const trimmedTitle = title.trim();
  
  const task = new Task({
    title: trimmedTitle,
    completed: false
  });

  const savedTask = await task.save();
  // Convertir a formato JSON con transformación
  return savedTask.toJSON();
}

/**
 * Obtiene todas las tareas
 * @returns {Promise<Array>} - Lista de tareas
 */
async function getAllTasks() {
  const tasks = await Task.find({}).sort({ createdAt: -1 });
  return tasks.map(task => task.toJSON());
}

/**
 * Obtiene una tarea por ID
 * @param {number|string} id - ID de la tarea (MongoDB ObjectId)
 * @returns {Promise<Object|undefined>} - Tarea encontrada o undefined
 */
async function getTaskById(id) {
  try {
    const task = await Task.findById(id);
    return task ? task.toJSON() : undefined;
  } catch (error) {
    // Si el ID no es válido, retornar undefined
    return undefined;
  }
}

/**
 * Cambia el estado de completado de una tarea
 * @param {number|string} id - ID de la tarea (MongoDB ObjectId)
 * @returns {Promise<Object|null>} - Tarea actualizada o null si no se encuentra
 */
async function toggleTaskCompletion(id) {
  try {
    const task = await Task.findById(id);
    if (!task) {
      return null;
    }
    task.completed = !task.completed;
    const updatedTask = await task.save();
    return updatedTask.toJSON();
  } catch (error) {
    // Si el ID no es válido, retornar null
    return null;
  }
}

/**
 * Resetea el almacenamiento (útil para testing)
 */
async function reset() {
  await Task.deleteMany({});
}

module.exports = {
  validateTitle,
  createTask,
  getAllTasks,
  getTaskById,
  toggleTaskCompletion,
  reset
};

