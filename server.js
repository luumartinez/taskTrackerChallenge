/**
 * Servidor principal de la aplicación Task Tracker
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/database');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Middleware para CORS (permitir peticiones desde el frontend)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware para parsear JSON
app.use(express.json());

// Middleware para logging (opcional, útil para desarrollo)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas de API (deben ir antes de los archivos estáticos)
app.use('/api/tasks', tasksRouter);

// Servir archivos estáticos (HTML, CSS, JS) - después de las rutas de API
app.use(express.static(path.join(__dirname)));

// Ruta principal - servir el HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta de salud (opcional)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Task Tracker API is running' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Iniciar servidor solo si no estamos en modo test
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api/tasks`);
  });
}

module.exports = app;

