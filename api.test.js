/**
 * Tests de integración para la API
 * Usando supertest para probar los endpoints HTTP
 */

const request = require('supertest');
const app = require('./server');
const taskService = require('./services/taskService');

// Limpiar el estado antes de cada prueba
beforeEach(() => {
  taskService.reset();
});

describe('API Tests', () => {
  describe('POST /api/tasks', () => {
    test('debe devolver 201 y la tarea creada', async () => {
      const newTask = {
        title: 'Nueva tarea de prueba'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201)
        .expect('Content-Type', /json/);

      // Verificar que la respuesta contiene la tarea creada
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title', 'Nueva tarea de prueba');
      expect(response.body).toHaveProperty('completed', false);
      expect(response.body).toHaveProperty('createdAt');
      
      // Verificar que createdAt es una fecha ISO válida
      expect(response.body.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
      expect(new Date(response.body.createdAt).toISOString()).toBe(response.body.createdAt);
      
      // Verificar que el id es un número
      expect(typeof response.body.id).toBe('number');
    });

    test('debe devolver 400 cuando no se envía título', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({})
        .expect(400)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Title is required');
    });

    test('debe devolver 400 cuando el título es undefined', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: undefined })
        .expect(400)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Title is required');
    });

    test('debe devolver 400 cuando el título es null', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: null })
        .expect(400)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Title is required');
    });

    test('debe devolver 400 cuando el título es string vacío', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: '' })
        .expect(400)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Title is required');
    });

    test('debe devolver 400 cuando el título tiene menos de 3 caracteres', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'ab' })
        .expect(400)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Title must be at least 3 characters long');
    });

    test('debe devolver 400 cuando el título tiene más de 80 caracteres', async () => {
      const longTitle = 'a'.repeat(81);
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: longTitle })
        .expect(400)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Title must be at most 80 characters long');
    });

    test('debe hacer trim del título al crear la tarea', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: '  Tarea con espacios  ' })
        .expect(201)
        .expect('Content-Type', /json/);

      expect(response.body.title).toBe('Tarea con espacios');
      expect(response.body.title).not.toBe('  Tarea con espacios  ');
    });
  });

  describe('GET /api/tasks', () => {
    test('debe devolver un array', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(Array.isArray(response.body)).toBe(true);
    });

    test('debe devolver un array vacío cuando no hay tareas', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toEqual([]);
      expect(response.body.length).toBe(0);
    });

    test('debe devolver todas las tareas creadas', async () => {
      // Crear algunas tareas
      await request(app)
        .post('/api/tasks')
        .send({ title: 'Primera tarea' })
        .expect(201);

      await request(app)
        .post('/api/tasks')
        .send({ title: 'Segunda tarea' })
        .expect(201);

      await request(app)
        .post('/api/tasks')
        .send({ title: 'Tercera tarea' })
        .expect(201);

      // Obtener todas las tareas
      const response = await request(app)
        .get('/api/tasks')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(3);
      
      // Verificar que todas las tareas tienen las propiedades correctas
      response.body.forEach(task => {
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('title');
        expect(task).toHaveProperty('completed');
        expect(task).toHaveProperty('createdAt');
      });

      // Verificar los títulos
      const titles = response.body.map(task => task.title);
      expect(titles).toContain('Primera tarea');
      expect(titles).toContain('Segunda tarea');
      expect(titles).toContain('Tercera tarea');
    });
  });
});

