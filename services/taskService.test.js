/**
 * Pruebas unitarias para taskService
 * Basado en taskService.js e instructions.md
 */

const taskService = require('./taskService');

// Limpiar el estado antes de cada prueba
beforeEach(() => {
  taskService.reset();
});

describe('validateTitle', () => {
  describe('Validación: title requerido', () => {
    test('debe retornar error cuando title es undefined', () => {
      const result = taskService.validateTitle(undefined);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Title is required');
    });

    test('debe retornar error cuando title es null', () => {
      const result = taskService.validateTitle(null);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Title is required');
    });

    test('debe retornar error cuando title es string vacío', () => {
      const result = taskService.validateTitle('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Title is required');
    });

    test('debe retornar error cuando title es solo espacios (trim)', () => {
      const result = taskService.validateTitle('   ');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Title is required');
    });

    test('debe retornar error cuando title tiene espacios al inicio y final', () => {
      const result = taskService.validateTitle('  ');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Title is required');
    });
  });

  describe('Validación: tipo de dato', () => {
    test('debe retornar error cuando title no es string (number)', () => {
      const result = taskService.validateTitle(123);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Title must be a string');
    });

    test('debe retornar error cuando title no es string (boolean)', () => {
      const result = taskService.validateTitle(true);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Title must be a string');
    });

    test('debe retornar error cuando title no es string (object)', () => {
      const result = taskService.validateTitle({});
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Title must be a string');
    });
  });

  describe('Validación: longitud mínima (3 caracteres)', () => {
    test('debe retornar error cuando title tiene menos de 3 caracteres (1 char)', () => {
      const result = taskService.validateTitle('a');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Title must be at least 3 characters long');
    });

    test('debe retornar error cuando title tiene menos de 3 caracteres (2 chars)', () => {
      const result = taskService.validateTitle('ab');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Title must be at least 3 characters long');
    });

    test('debe retornar error cuando title tiene menos de 3 caracteres después del trim', () => {
      const result = taskService.validateTitle('  ab  ');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Title must be at least 3 characters long');
    });

    test('debe ser válido cuando title tiene exactamente 3 caracteres', () => {
      const result = taskService.validateTitle('abc');
      expect(result.valid).toBe(true);
      expect(result.trimmedTitle).toBe('abc');
    });
  });

  describe('Validación: longitud máxima (80 caracteres)', () => {
    test('debe retornar error cuando title tiene más de 80 caracteres', () => {
      const longTitle = 'a'.repeat(81);
      const result = taskService.validateTitle(longTitle);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Title must be at most 80 characters long');
    });

    test('debe retornar error cuando title tiene más de 80 caracteres después del trim', () => {
      const longTitle = '  ' + 'a'.repeat(81) + '  ';
      const result = taskService.validateTitle(longTitle);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Title must be at most 80 characters long');
    });

    test('debe ser válido cuando title tiene exactamente 80 caracteres', () => {
      const longTitle = 'a'.repeat(80);
      const result = taskService.validateTitle(longTitle);
      expect(result.valid).toBe(true);
      expect(result.trimmedTitle).toBe(longTitle);
    });
  });

  describe('Validación: trim de espacios', () => {
    test('debe hacer trim de espacios al inicio', () => {
      const result = taskService.validateTitle('  Tarea válida');
      expect(result.valid).toBe(true);
      expect(result.trimmedTitle).toBe('Tarea válida');
    });

    test('debe hacer trim de espacios al final', () => {
      const result = taskService.validateTitle('Tarea válida  ');
      expect(result.valid).toBe(true);
      expect(result.trimmedTitle).toBe('Tarea válida');
    });

    test('debe hacer trim de espacios al inicio y final', () => {
      const result = taskService.validateTitle('  Tarea válida  ');
      expect(result.valid).toBe(true);
      expect(result.trimmedTitle).toBe('Tarea válida');
    });

    test('debe mantener espacios internos', () => {
      const result = taskService.validateTitle('Tarea con espacios internos');
      expect(result.valid).toBe(true);
      expect(result.trimmedTitle).toBe('Tarea con espacios internos');
    });
  });

  describe('Casos válidos', () => {
    test('debe ser válido con título de 3 caracteres', () => {
      const result = taskService.validateTitle('abc');
      expect(result.valid).toBe(true);
      expect(result.trimmedTitle).toBe('abc');
    });

    test('debe ser válido con título de longitud media', () => {
      const result = taskService.validateTitle('Tarea de ejemplo');
      expect(result.valid).toBe(true);
      expect(result.trimmedTitle).toBe('Tarea de ejemplo');
    });

    test('debe ser válido con título de 80 caracteres', () => {
      const longTitle = 'a'.repeat(80);
      const result = taskService.validateTitle(longTitle);
      expect(result.valid).toBe(true);
      expect(result.trimmedTitle).toBe(longTitle);
    });
  });
});

describe('createTask', () => {

  test('debe crear una tarea con valores por defecto', () => {
    const task = taskService.createTask('Nueva tarea');

    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('title', 'Nueva tarea');
    expect(task).toHaveProperty('completed', false);
    expect(task).toHaveProperty('createdAt');
    
    // Verificar que createdAt es una fecha ISO válida
    expect(task.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    expect(new Date(task.createdAt).toISOString()).toBe(task.createdAt);
  });

  test('debe hacer trim del título al crear la tarea', () => {
    const task = taskService.createTask('  Tarea con espacios  ');

    expect(task.title).toBe('Tarea con espacios');
    expect(task.title).not.toBe('  Tarea con espacios  ');
  });

  test('debe asignar IDs incrementales', () => {
    const task1 = taskService.createTask('Tarea 1');
    const task2 = taskService.createTask('Tarea 2');
    const task3 = taskService.createTask('Tarea 3');

    expect(task1.id).toBeLessThan(task2.id);
    expect(task2.id).toBeLessThan(task3.id);
    expect(task3.id - task1.id).toBe(2);
  });

  test('debe agregar la tarea al almacenamiento', () => {
    const initialCount = taskService.getAllTasks().length;
    const task = taskService.createTask('Tarea de prueba');
    const finalCount = taskService.getAllTasks().length;

    expect(finalCount).toBe(initialCount + 1);
    expect(taskService.getAllTasks()).toContainEqual(task);
  });

  test('debe establecer completed en false por defecto', () => {
    const task = taskService.createTask('Tarea sin completar');
    expect(task.completed).toBe(false);
  });

  test('debe establecer createdAt como fecha ISO string', () => {
    const beforeCreation = new Date().toISOString();
    const task = taskService.createTask('Tarea con fecha');
    const afterCreation = new Date().toISOString();

    expect(task.createdAt).toBeTruthy();
    expect(typeof task.createdAt).toBe('string');
    expect(new Date(task.createdAt).getTime()).toBeGreaterThanOrEqual(new Date(beforeCreation).getTime());
    expect(new Date(task.createdAt).getTime()).toBeLessThanOrEqual(new Date(afterCreation).getTime());
  });

    test('debe crear múltiples tareas correctamente', () => {
    const task1 = taskService.createTask('Primera tarea');
    const task2 = taskService.createTask('Segunda tarea');
    const task3 = taskService.createTask('Tercera tarea');

    const allTasks = taskService.getAllTasks();
    expect(allTasks.length).toBe(3);
    expect(allTasks).toContainEqual(task1);
    expect(allTasks).toContainEqual(task2);
    expect(allTasks).toContainEqual(task3);
  });
});

describe('getAllTasks', () => {
  test('debe retornar un array vacío cuando no hay tareas', () => {
    const tasks = taskService.getAllTasks();
    expect(tasks).toEqual([]);
    expect(Array.isArray(tasks)).toBe(true);
  });

  test('debe retornar todas las tareas creadas', () => {
    const task1 = taskService.createTask('Tarea 1');
    const task2 = taskService.createTask('Tarea 2');
    const task3 = taskService.createTask('Tarea 3');

    const allTasks = taskService.getAllTasks();
    expect(allTasks.length).toBe(3);
    expect(allTasks).toContainEqual(task1);
    expect(allTasks).toContainEqual(task2);
    expect(allTasks).toContainEqual(task3);
  });

  test('debe retornar una referencia al array de tareas', () => {
    const task = taskService.createTask('Tarea de prueba');
    const tasks1 = taskService.getAllTasks();
    const tasks2 = taskService.getAllTasks();
    
    expect(tasks1).toBe(tasks2); // Misma referencia
    expect(tasks1.length).toBe(1);
  });
});

describe('getTaskById', () => {
  test('debe retornar undefined cuando la tarea no existe', () => {
    const task = taskService.getTaskById(999);
    expect(task).toBeUndefined();
  });

  test('debe retornar la tarea cuando existe (id como number)', () => {
    const createdTask = taskService.createTask('Tarea de prueba');
    const task = taskService.getTaskById(createdTask.id);
    
    expect(task).toBeDefined();
    expect(task).toEqual(createdTask);
    expect(task.id).toBe(createdTask.id);
    expect(task.title).toBe('Tarea de prueba');
  });

  test('debe retornar la tarea cuando existe (id como string)', () => {
    const createdTask = taskService.createTask('Tarea de prueba');
    const task = taskService.getTaskById(String(createdTask.id));
    
    expect(task).toBeDefined();
    expect(task).toEqual(createdTask);
    expect(task.id).toBe(createdTask.id);
  });

  test('debe retornar undefined cuando el id no coincide', () => {
    const task1 = taskService.createTask('Tarea 1');
    const task2 = taskService.createTask('Tarea 2');
    
    const foundTask = taskService.getTaskById(task1.id + 100);
    expect(foundTask).toBeUndefined();
  });

  test('debe manejar múltiples tareas y encontrar la correcta', () => {
    const task1 = taskService.createTask('Tarea 1');
    const task2 = taskService.createTask('Tarea 2');
    const task3 = taskService.createTask('Tarea 3');

    const foundTask = taskService.getTaskById(task2.id);
    expect(foundTask).toEqual(task2);
    expect(foundTask.title).toBe('Tarea 2');
  });
});

describe('toggleTaskCompletion', () => {
  test('debe cambiar completed de false a true', () => {
    const task = taskService.createTask('Tarea pendiente');
    expect(task.completed).toBe(false);

    const updatedTask = taskService.toggleTaskCompletion(task.id);
    expect(updatedTask.completed).toBe(true);
    expect(updatedTask.id).toBe(task.id);
    expect(updatedTask.title).toBe(task.title);
  });

  test('debe cambiar completed de true a false', () => {
    const task = taskService.createTask('Tarea pendiente');
    taskService.toggleTaskCompletion(task.id); // Primero a true
    const updatedTask = taskService.toggleTaskCompletion(task.id); // Luego a false

    expect(updatedTask.completed).toBe(false);
  });

  test('debe retornar null cuando la tarea no existe', () => {
    const result = taskService.toggleTaskCompletion(999);
    expect(result).toBeNull();
  });

  test('debe retornar null cuando el id no existe (string)', () => {
    const result = taskService.toggleTaskCompletion('999');
    expect(result).toBeNull();
  });

  test('debe modificar la tarea en el almacenamiento', () => {
    const task = taskService.createTask('Tarea de prueba');
    taskService.toggleTaskCompletion(task.id);

    const storedTask = taskService.getTaskById(task.id);
    expect(storedTask.completed).toBe(true);
  });

  test('debe funcionar con id como string', () => {
    const task = taskService.createTask('Tarea de prueba');
    const updatedTask = taskService.toggleTaskCompletion(String(task.id));
    
    expect(updatedTask).toBeDefined();
    expect(updatedTask.completed).toBe(true);
  });

  test('debe poder alternar el estado múltiples veces', () => {
    const task = taskService.createTask('Tarea de prueba');
    
    expect(task.completed).toBe(false);
    
    const task1 = taskService.toggleTaskCompletion(task.id);
    expect(task1.completed).toBe(true);
    
    const task2 = taskService.toggleTaskCompletion(task.id);
    expect(task2.completed).toBe(false);
    
    const task3 = taskService.toggleTaskCompletion(task.id);
    expect(task3.completed).toBe(true);
  });
});

describe('reset', () => {
  test('debe limpiar todas las tareas', () => {
    taskService.createTask('Tarea 1');
    taskService.createTask('Tarea 2');
    taskService.createTask('Tarea 3');

    expect(taskService.getAllTasks().length).toBe(3);
    
    taskService.reset();
    
    expect(taskService.getAllTasks().length).toBe(0);
    expect(taskService.getAllTasks()).toEqual([]);
  });

  test('debe resetear el contador de IDs', () => {
    const task1 = taskService.createTask('Tarea 1');
    const task2 = taskService.createTask('Tarea 2');
    
    expect(task1.id).toBe(1);
    expect(task2.id).toBe(2);
    
    taskService.reset();
    
    const newTask = taskService.createTask('Nueva tarea');
    expect(newTask.id).toBe(1); // Debe empezar desde 1 nuevamente
  });

  test('debe permitir crear tareas después del reset', () => {
    taskService.createTask('Tarea antigua');
    taskService.reset();
    
    const newTask = taskService.createTask('Tarea nueva');
    expect(newTask).toBeDefined();
    expect(newTask.id).toBe(1);
    expect(taskService.getAllTasks().length).toBe(1);
  });
});

